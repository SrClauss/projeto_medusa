import React from 'react';
import { Check } from 'lucide-react';

const STEPS = [
  { id: 0, title: 'Servidor', description: 'Configuração do servidor' },
  { id: 1, title: 'Identidade', description: 'Nome e slogan da loja' },
  { id: 2, title: 'Design', description: 'Escola de design' },
  { id: 3, title: 'Tema', description: 'Cores e tipografia' },
  { id: 4, title: 'Produtos', description: 'Upload CSV' },
  { id: 5, title: 'Imagens', description: 'Assets de produtos' },
  { id: 6, title: 'Deploy', description: 'Implantação' },
  { id: 7, title: 'Concluído', description: 'Loja pronta' },
];

export const WizardStepper = ({ currentStep }) => {
  return (
    <div className="w-full bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    step.id < currentStep
                      ? 'bg-green-500 border-green-500 text-white'
                      : step.id === currentStep
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}
                >
                  {step.id < currentStep ? (
                    <Check size={20} />
                  ) : (
                    <span className="text-sm font-semibold">{step.id + 1}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={`text-sm font-medium ${
                      step.id <= currentStep ? 'text-gray-900' : 'text-gray-400'
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500 hidden md:block">{step.description}</p>
                </div>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 transition-all ${
                    step.id < currentStep ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                  style={{ maxWidth: '100px' }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
