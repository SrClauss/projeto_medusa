import React from 'react';
import { Brush, ArrowRight, ArrowLeft } from 'lucide-react';
import { useWizard } from '../../contexts/WizardContext';

const FONT_PAIRS = [
  { id: 'inter-roboto', primary: 'Inter', secondary: 'Roboto' },
  { id: 'poppins-opensans', primary: 'Poppins', secondary: 'Open Sans' },
  { id: 'montserrat-lato', primary: 'Montserrat', secondary: 'Lato' },
  { id: 'playfair-sourcesans', primary: 'Playfair Display', secondary: 'Source Sans Pro' },
  { id: 'raleway-nunito', primary: 'Raleway', secondary: 'Nunito' },
];

export const ThemeStep = () => {
  const { wizardData, updateWizardData, nextStep, prevStep } = useWizard();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center mb-6">
          <Brush className="w-8 h-8 text-indigo-500 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Personalização do Tema</h2>
        </div>
        
        <p className="text-gray-600 mb-8">
          Personalize as cores e tipografia da sua loja baseado na escola de design selecionada.
        </p>

        <div className="space-y-8">
          {/* Colors Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Cores</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cor Primária
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={wizardData.design.primaryColor}
                    onChange={(e) => updateWizardData('design', { primaryColor: e.target.value })}
                    className="w-16 h-16 rounded border border-gray-300 cursor-pointer"
                  />
                  <div>
                    <p className="text-sm font-mono text-gray-600">
                      {wizardData.design.primaryColor}
                    </p>
                    <p className="text-xs text-gray-500">Botões e destaques</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cor Secundária
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={wizardData.design.secondaryColor}
                    onChange={(e) => updateWizardData('design', { secondaryColor: e.target.value })}
                    className="w-16 h-16 rounded border border-gray-300 cursor-pointer"
                  />
                  <div>
                    <p className="text-sm font-mono text-gray-600">
                      {wizardData.design.secondaryColor}
                    </p>
                    <p className="text-xs text-gray-500">Links e acentos</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cor de Fundo
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={wizardData.design.backgroundColor}
                    onChange={(e) => updateWizardData('design', { backgroundColor: e.target.value })}
                    className="w-16 h-16 rounded border border-gray-300 cursor-pointer"
                  />
                  <div>
                    <p className="text-sm font-mono text-gray-600">
                      {wizardData.design.backgroundColor}
                    </p>
                    <p className="text-xs text-gray-500">Plano de fundo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Typography Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tipografia</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FONT_PAIRS.map((pair) => (
                <button
                  key={pair.id}
                  onClick={() => updateWizardData('design', { fontPair: `${pair.primary} + ${pair.secondary}` })}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    wizardData.design.fontPair === `${pair.primary} + ${pair.secondary}`
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="font-bold text-lg mb-1" style={{ fontFamily: pair.primary }}>
                    {pair.primary}
                  </p>
                  <p className="text-sm text-gray-600" style={{ fontFamily: pair.secondary }}>
                    {pair.secondary}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Preview Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Prévia</h3>
            <div
              className="p-8 rounded-lg"
              style={{ backgroundColor: wizardData.design.backgroundColor }}
            >
              <h1
                className="text-3xl font-bold mb-2"
                style={{ color: wizardData.design.primaryColor }}
              >
                {wizardData.identity.name || 'Nome da Loja'}
              </h1>
              <p
                className="text-lg mb-4"
                style={{ color: wizardData.design.secondaryColor }}
              >
                {wizardData.identity.slogan || 'Slogan da loja'}
              </p>
              <button
                className="px-6 py-3 rounded-lg text-white font-medium"
                style={{ backgroundColor: wizardData.design.primaryColor }}
              >
                Ver Produtos
              </button>
            </div>
          </div>
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
            className="px-6 py-3 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 flex items-center"
          >
            Continuar
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};
