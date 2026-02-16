import yaml from 'js-yaml';

export class YamlWizardStorage {
  constructor(filename = 'medusa-wizard.yml') {
    this.filename = filename;
    this.tauriApis = null;
  }

  // Carrega APIs do Tauri dinamicamente
  async loadTauriApis() {
    if (this.tauriApis) return this.tauriApis;

    try {
      // Use dynamic eval-import to prevent Vite from pre-bundling @tauri-apps packages
      const fsModule = await eval("import('@tauri-apps/api/fs')");
      const pathModule = await eval("import('@tauri-apps/api/path')");

      const { writeTextFile, readTextFile, BaseDirectory } = fsModule;
      const { documentDir } = pathModule;

      this.tauriApis = { writeTextFile, readTextFile, BaseDirectory, documentDir };
      return this.tauriApis;
    } catch (error) {
      console.warn('Tauri APIs not available, using localStorage fallback:', error);
      this.tauriApis = null;
      return null;
    }
  }

  // Salva o estado atual do wizard em YAML
  async saveWizardState(wizardData, currentStep) {
    try {
      const apis = await this.loadTauriApis();
      const data = {
        version: '1.0',
        timestamp: new Date().toISOString(),
        currentStep,
        wizardData: {
          deploymentType: wizardData.deploymentType,
          server: wizardData.server,
          identity: wizardData.identity,
          design: wizardData.design,
          payment: wizardData.payment,
          products: wizardData.products,
          images: wizardData.images,
          deployment: wizardData.deployment,
        },
        steps: this.generateStepsHistory(wizardData, currentStep),
      };

      const yamlContent = yaml.dump(data, {
        indent: 2,
        lineWidth: -1,
        noRefs: true,
      });

      if (apis) {
        // Salva no sistema de arquivos usando Tauri
        const { writeTextFile, BaseDirectory } = apis;
        await writeTextFile(this.filename, yamlContent, {
          dir: BaseDirectory.Document,
        });
        console.log('Estado salvo em YAML:', this.filename);
      } else {
        // Fallback para localStorage
        localStorage.setItem(`yaml-wizard-${this.filename}`, yamlContent);
        console.log('Estado salvo em localStorage (fallback)');
      }

      return true;
    } catch (error) {
      console.error('Erro ao salvar estado do wizard:', error);
      return false;
    }
  }

  // Carrega o estado do wizard do YAML
  async loadWizardState() {
    try {
      const apis = await this.loadTauriApis();
      let yamlContent;

      if (apis) {
        // Carrega do sistema de arquivos usando Tauri
        const { readTextFile, BaseDirectory } = apis;
        yamlContent = await readTextFile(this.filename, {
          dir: BaseDirectory.Document,
        });
      } else {
        // Fallback para localStorage
        yamlContent = localStorage.getItem(`yaml-wizard-${this.filename}`);
        if (!yamlContent) return null;
      }

      const data = yaml.load(yamlContent);

      // Validação básica
      if (!data || !data.wizardData) {
        throw new Error('Arquivo YAML inválido');
      }

      return {
        currentStep: data.currentStep || 0,
        wizardData: {
          deploymentType: data.wizardData.deploymentType || 'remote',
          server: data.wizardData.server || { ip: '', domain: '', connected: false },
          identity: data.wizardData.identity || { name: '', slogan: '' },
          design: data.wizardData.design || {
            school: null,
            primaryColor: '#3b82f6',
            secondaryColor: '#8b5cf6',
            backgroundColor: '#ffffff',
            fontPair: 'Inter + Roboto',
          },
          payment: data.wizardData.payment || {
            mercadoPagoToken: '',
            webhookSecret: '',
            testMode: true,
          },
          products: data.wizardData.products || {
            csvData: [],
            csvFile: null,
          },
          images: data.wizardData.images || {
            directory: null,
            mapping: {},
          },
          deployment: data.wizardData.deployment || {
            status: 'idle',
            logs: [],
            url: null,
          },
        },
        steps: data.steps || [],
        timestamp: data.timestamp,
      };
    } catch (error) {
      console.error('Erro ao carregar estado do wizard:', error);
      return null;
    }
  }

  // Verifica se existe um estado salvo
  async hasSavedState() {
    try {
      const apis = await this.loadTauriApis();

      if (apis) {
        const { readTextFile, BaseDirectory } = apis;
        await readTextFile(this.filename, { dir: BaseDirectory.Document });
        return true;
      } else {
        return localStorage.getItem(`yaml-wizard-${this.filename}`) !== null;
      }
    } catch (error) {
      return false;
    }
  }

  // Navega para um passo específico baseado no histórico
  async navigateToStep(stepId, currentWizardData) {
    try {
      const state = await this.loadWizardState();
      if (!state || !state.steps) return null;

      const targetStep = state.steps.find(step => step.id === stepId);
      if (!targetStep) return null;

      // Restaura o estado até o passo selecionado
      const restoredData = { ...currentWizardData };
      state.steps.forEach(step => {
        if (step.id <= stepId && step.data) {
          Object.assign(restoredData, step.data);
        }
      });

      return {
        currentStep: stepId,
        wizardData: restoredData,
      };
    } catch (error) {
      console.error('Erro ao navegar para passo:', error);
      return null;
    }
  }

  // Gera histórico de passos baseado no estado atual
  generateStepsHistory(wizardData, currentStep) {
    const steps = [];

    // Passo 0: Tipo de implantação
    steps.push({
      id: 0,
      name: 'Tipo de Implantação',
      completed: currentStep >= 0,
      data: { deploymentType: wizardData.deploymentType },
    });

    // Passo 1: Servidor (só se for remote)
    if (wizardData.deploymentType === 'remote') {
      steps.push({
        id: 1,
        name: 'Configuração do Servidor',
        completed: currentStep >= 1,
        data: { server: wizardData.server },
      });
    }

    // Passo 2: Identidade
    steps.push({
      id: 2,
      name: 'Identidade da Loja',
      completed: currentStep >= (wizardData.deploymentType === 'remote' ? 2 : 1),
      data: { identity: wizardData.identity },
    });

    // Passo 3: Design
    steps.push({
      id: 3,
      name: 'Design e Tema',
      completed: currentStep >= (wizardData.deploymentType === 'remote' ? 3 : 2),
      data: { design: wizardData.design },
    });

    // Passo 4: Pagamento
    steps.push({
      id: 4,
      name: 'Configuração de Pagamento',
      completed: currentStep >= (wizardData.deploymentType === 'remote' ? 4 : 3),
      data: { payment: wizardData.payment },
    });

    // Passo 5: Produtos
    steps.push({
      id: 5,
      name: 'Importação de Produtos',
      completed: currentStep >= (wizardData.deploymentType === 'remote' ? 5 : 4),
      data: { products: wizardData.products },
    });

    // Passo 6: Imagens
    steps.push({
      id: 6,
      name: 'Otimização de Imagens',
      completed: currentStep >= (wizardData.deploymentType === 'remote' ? 6 : 5),
      data: { images: wizardData.images },
    });

    // Passo 7: Implantação
    steps.push({
      id: 7,
      name: 'Implantação',
      completed: currentStep >= (wizardData.deploymentType === 'remote' ? 7 : 6),
      data: { deployment: wizardData.deployment },
    });

    // Passo 8: Conclusão
    steps.push({
      id: 8,
      name: 'Conclusão',
      completed: currentStep >= (wizardData.deploymentType === 'remote' ? 8 : 7),
      data: {},
    });

    return steps;
  }
}

