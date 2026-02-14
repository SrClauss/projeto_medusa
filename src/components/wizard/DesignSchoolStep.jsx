import React from 'react';
import { Palette, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useWizard } from '../../contexts/WizardContext';

const DESIGN_SCHOOLS = [
  {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    description: 'Efeitos de vidro translúcido e blur',
    preview: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
    colors: ['#ffffff', '#f0f9ff', '#e0f2fe'],
  },
  {
    id: 'material3',
    name: 'Material Design 3',
    description: 'Design moderno do Google com cores vibrantes',
    preview: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    colors: ['#6366f1', '#8b5cf6', '#ec4899'],
  },
  {
    id: 'neumorphism',
    name: 'Neumorphism',
    description: 'Efeitos suaves de extrusão e sombras',
    preview: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
    colors: ['#e0e0e0', '#ffffff', '#f5f5f5'],
  },
  {
    id: 'brutalism',
    name: 'Brutalismo',
    description: 'Design ousado com contraste forte',
    preview: 'linear-gradient(135deg, #000000 0%, #ff0000 100%)',
    colors: ['#000000', '#ffffff', '#ff0000'],
  },
  {
    id: 'nordic',
    name: 'Minimalismo Nórdico',
    description: 'Tons neutros e espaçamento generoso',
    preview: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    colors: ['#f8fafc', '#64748b', '#1e293b'],
  },
  {
    id: 'luxury',
    name: 'Luxury',
    description: 'Elegância com dourado e preto',
    preview: 'linear-gradient(135deg, #1a1a1a 0%, #d4af37 100%)',
    colors: ['#1a1a1a', '#d4af37', '#ffffff'],
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Neon vibrante e futurista',
    preview: 'linear-gradient(135deg, #0a0e27 0%, #ff00ff 50%, #00ffff 100%)',
    colors: ['#0a0e27', '#ff00ff', '#00ffff'],
  },
  {
    id: 'bento',
    name: 'Bento Grid',
    description: 'Layout em grade modular',
    preview: 'linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)',
    colors: ['#f1f5f9', '#3b82f6', '#1e293b'],
  },
  {
    id: 'retro',
    name: 'Retro/Vintage',
    description: 'Cores quentes e nostálgicas',
    preview: 'linear-gradient(135deg, #fef3c7 0%, #fca5a5 100%)',
    colors: ['#fef3c7', '#fca5a5', '#fb923c'],
  },
  {
    id: 'claymorphism',
    name: 'Claymorphism',
    description: 'Texturas suaves de argila 3D',
    preview: 'linear-gradient(135deg, #fde68a 0%, #fbbf24 100%)',
    colors: ['#fde68a', '#fbbf24', '#f59e0b'],
  },
];

export const DesignSchoolStep = () => {
  const { wizardData, updateWizardData, nextStep, prevStep } = useWizard();

  const handleSelectSchool = (school) => {
    updateWizardData('design', {
      school: school.id,
      primaryColor: school.colors[0],
      secondaryColor: school.colors[1],
      backgroundColor: school.colors[2],
    });
  };

  const canContinue = wizardData.design.school !== null;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center mb-6">
          <Palette className="w-8 h-8 text-pink-500 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Escola de Design</h2>
        </div>
        
        <p className="text-gray-600 mb-8">
          Escolha uma escola de design visual para sua loja. Você poderá personalizar
          cores e tipografia na próxima etapa.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESIGN_SCHOOLS.map((school) => (
            <button
              key={school.id}
              onClick={() => handleSelectSchool(school)}
              className={`relative p-6 rounded-lg border-2 transition-all text-left hover:shadow-lg ${
                wizardData.design.school === school.id
                  ? 'border-pink-500 bg-pink-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {wizardData.design.school === school.id && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                  <Check size={16} className="text-white" />
                </div>
              )}
              
              <div
                className="w-full h-32 rounded-lg mb-4"
                style={{ background: school.preview }}
              />
              
              <h3 className="font-bold text-lg text-gray-900 mb-2">{school.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{school.description}</p>
              
              <div className="flex gap-2">
                {school.colors.map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded border border-gray-300"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </button>
          ))}
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
            className="px-6 py-3 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
          >
            Continuar
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};
