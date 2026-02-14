import React from 'react';
import { Store, ArrowRight, ArrowLeft } from 'lucide-react';
import { useWizard } from '../../contexts/WizardContext';

export const IdentityStep = () => {
  const { wizardData, updateWizardData, nextStep, prevStep } = useWizard();

  const canContinue = wizardData.identity.name && wizardData.identity.slogan;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center mb-6">
          <Store className="w-8 h-8 text-purple-500 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Identidade da Loja</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          Defina o nome e o slogan da sua loja. Essas informações serão exibidas no frontend
          e utilizadas para configurar o backend.
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome da Loja *
            </label>
            <input
              type="text"
              placeholder="Minha Loja Incrível"
              value={wizardData.identity.name}
              onChange={(e) => updateWizardData('identity', { name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
            />
            <p className="mt-1 text-sm text-gray-500">
              Este será o nome exibido no cabeçalho e metadados do site
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slogan *
            </label>
            <input
              type="text"
              placeholder="Os melhores produtos para você"
              value={wizardData.identity.slogan}
              onChange={(e) => updateWizardData('identity', { slogan: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <p className="mt-1 text-sm text-gray-500">
              Uma frase curta e impactante que representa sua loja
            </p>
          </div>

          {canContinue && (
            <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="font-medium text-purple-900 mb-2">Prévia</h3>
              <p className="text-2xl font-bold text-purple-900">{wizardData.identity.name}</p>
              <p className="text-purple-700 italic">{wizardData.identity.slogan}</p>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={prevStep}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </button>
          <button
            onClick={nextStep}
            disabled={!canContinue}
            className="px-6 py-3 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
          >
            Continuar
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};
