import React from 'react';
import { Server, Container, ArrowRight } from 'lucide-react';
import { useWizard } from '../../contexts/WizardContext';

export const DeploymentTypeStep = () => {
  const { wizardData, updateWizardData, nextStep } = useWizard();

  const handleSelectType = (type) => {
    updateWizardData('deploymentType', type);
    nextStep();
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Escolha o Tipo de Implantação</h2>
          <p className="text-gray-600">
            Como você gostaria de implantar sua loja Medusa?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Opção Servidor Remoto */}
          <div
            onClick={() => handleSelectType('remote')}
            className={`border-2 rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg ${
              wizardData.deploymentType === 'remote'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center mb-4">
              <Server className="w-8 h-8 text-blue-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">Servidor Remoto</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Implante em um servidor Linux remoto via SSH. Ideal para produção com domínio personalizado.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Conexão SSH automática</li>
              <li>• SSL automático (Let's Encrypt)</li>
              <li>• Domínio personalizado</li>
              <li>• Infraestrutura completa</li>
            </ul>
          </div>

          {/* Opção Container Local */}
          <div
            onClick={() => handleSelectType('local')}
            className={`border-2 rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg ${
              wizardData.deploymentType === 'local'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-green-300'
            }`}
          >
            <div className="flex items-center mb-4">
              <Container className="w-8 h-8 text-green-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">Container Local</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Execute localmente em um container Docker. <strong>Perfeito para testes e desenvolvimento</strong> - sem necessidade de configurar servidor ou domínio.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Container "medusa-project"</li>
              <li>• Acesso via localhost</li>
              <li>• Configuração rápida</li>
              <li>• <strong>Sem servidor remoto</strong></li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={nextStep}
            disabled={!wizardData.deploymentType}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center mx-auto"
          >
            Continuar
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};