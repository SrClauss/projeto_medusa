import React from 'react';
import { FileText, ChevronRight, RotateCcw, Download, Upload } from 'lucide-react';
import { useWizard } from '../../contexts/WizardContext';

export const YamlNavigator = () => {
  const {
    yamlSteps,
    hasSavedState,
    currentStep,
    navigateToYamlStep,
    resetWizard,
    loadFromYaml
  } = useWizard();

  if (!hasSavedState || yamlSteps.length === 0) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center text-blue-800">
          <FileText className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">Nenhum progresso salvo em YAML</span>
        </div>
        <p className="text-xs text-blue-600 mt-1">
          Os passos serão automaticamente salvos em YAML conforme você avança no wizard.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FileText className="w-5 h-5 text-blue-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Navegação YAML</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={loadFromYaml}
            className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
            title="Recarregar do YAML"
          >
            <Upload className="w-3 h-3 mr-1" />
            Carregar
          </button>
          <button
            onClick={resetWizard}
            className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
            title="Resetar wizard"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Reset
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {yamlSteps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
              step.id === currentStep
                ? 'bg-blue-50 border-blue-300'
                : step.completed
                ? 'bg-green-50 border-green-200 hover:bg-green-100'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
            onClick={() => navigateToYamlStep(step.id)}
          >
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-3 ${
                  step.id === currentStep
                    ? 'bg-blue-500 text-white'
                    : step.completed
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {step.id + 1}
              </div>
              <div>
                <p className={`font-medium ${step.id === currentStep ? 'text-blue-800' : 'text-gray-800'}`}>
                  {step.name}
                </p>
                <p className="text-xs text-gray-500">
                  {step.completed ? 'Concluído' : 'Pendente'}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              {step.id === currentStep && (
                <span className="text-xs text-blue-600 font-medium mr-2">Atual</span>
              )}
              <ChevronRight className={`w-4 h-4 ${step.id === currentStep ? 'text-blue-500' : 'text-gray-400'}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600">
          <strong>Arquivo:</strong> <code className="bg-white px-1 py-0.5 rounded text-xs">medusa-wizard.yml</code>
          <br />
          <strong>Local:</strong> Pasta de documentos do sistema
        </p>
        <p className="text-xs text-gray-500 mt-1">
          O progresso é automaticamente salvo em YAML. Você pode navegar livremente entre os passos usando os botões acima.
        </p>
      </div>
    </div>
  );
};