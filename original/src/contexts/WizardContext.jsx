import React, { createContext, useContext, useState, useEffect } from 'react';
import { YamlWizardStorage } from '../utils/yamlStorage';

const yamlStorage = new YamlWizardStorage();

const WizardContext = createContext();

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within WizardProvider');
  }
  return context;
};

export const WizardProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [wizardData, setWizardData] = useState({
    deploymentType: 'remote', // 'remote' or 'local'
    server: {
      ip: '',
      domain: '',
      connected: false,
    },
    identity: {
      name: '',
      slogan: '',
    },
    design: {
      school: null,
      primaryColor: '#3b82f6',
      secondaryColor: '#8b5cf6',
      backgroundColor: '#ffffff',
      fontPair: 'Inter + Roboto',
    },
    payment: {
      mercadoPagoToken: '',
      webhookSecret: '',
      testMode: true,
    },
    products: {
      csvData: [],
      csvFile: null,
    },
    images: {
      directory: null,
      mapping: {},
    },
    deployment: {
      status: 'idle', // idle, deploying, success, error
      logs: [],
      url: null,
    },
  });

  const [yamlSteps, setYamlSteps] = useState([]);
  const [hasSavedState, setHasSavedState] = useState(false);

  // Carrega estado salvo na inicialização
  useEffect(() => {
    const loadSavedState = async () => {
      const saved = await yamlStorage.hasSavedState();
      setHasSavedState(saved);

      if (saved) {
        const state = await yamlStorage.loadWizardState();
        if (state) {
          setCurrentStep(state.currentStep);
          setWizardData(state.wizardData);
          setYamlSteps(state.steps);
        }
      }
    };

    loadSavedState();
  }, []);

  // Salva estado automaticamente quando muda
  useEffect(() => {
    const saveState = async () => {
      await yamlStorage.saveWizardState(wizardData, currentStep);
      const steps = yamlStorage.generateStepsHistory(wizardData, currentStep);
      setYamlSteps(steps);
      setHasSavedState(true);
    };

    // Pequeno delay para evitar saves excessivos
    const timeoutId = setTimeout(saveState, 500);
    return () => clearTimeout(timeoutId);
  }, [wizardData, currentStep]);

  const updateWizardData = (section, data) => {
    setWizardData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => Math.max(0, prev - 1));
  const goToStep = (step) => setCurrentStep(step);

  // Navegação baseada em YAML
  const navigateToYamlStep = async (stepId) => {
    const result = await yamlStorage.navigateToStep(stepId, wizardData);
    if (result) {
      setCurrentStep(result.currentStep);
      setWizardData(result.wizardData);
    }
  };

  const resetWizard = () => {
    setCurrentStep(0);
    setWizardData({
      deploymentType: 'remote',
      server: { ip: '', domain: '', connected: false },
      identity: { name: '', slogan: '' },
      design: {
        school: null,
        primaryColor: '#3b82f6',
        secondaryColor: '#8b5cf6',
        backgroundColor: '#ffffff',
        fontPair: 'Inter + Roboto',
      },
      payment: { mercadoPagoToken: '', webhookSecret: '', testMode: true },
      products: { csvData: [], csvFile: null },
      images: { directory: null, mapping: {} },
      deployment: { status: 'idle', logs: [], url: null },
    });
    setYamlSteps([]);
    setHasSavedState(false);
  };

  const loadFromYaml = async () => {
    const state = await yamlStorage.loadWizardState();
    if (state) {
      setCurrentStep(state.currentStep);
      setWizardData(state.wizardData);
      setYamlSteps(state.steps);
      setHasSavedState(true);
      return true;
    }
    return false;
  };

  const addLog = (log) => {
    setWizardData(prev => ({
      ...prev,
      deployment: {
        ...prev.deployment,
        logs: [...prev.deployment.logs, { timestamp: new Date().toISOString(), message: log }],
      },
    }));
  };

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        wizardData,
        yamlSteps,
        hasSavedState,
        updateWizardData,
        nextStep,
        prevStep,
        goToStep,
        navigateToYamlStep,
        resetWizard,
        loadFromYaml,
        addLog,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};
