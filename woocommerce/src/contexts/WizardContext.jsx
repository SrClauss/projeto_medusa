import { createContext, useContext, useState } from 'react';

const WizardContext = createContext();

export function WizardProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [config, setConfig] = useState({
    deploymentType: 'woocommerce',
    server: {
      host: '',
      domain: '',
    },
    store: {
      name: '',
      tagline: '',
      adminEmail: '',
      adminPassword: '',
    },
    theme: {
      name: 'storefront',
      primaryColor: '#7F54B3',
      secondaryColor: '#2C3E50',
    },
    payment: {
      gateway: 'mercadopago',
      credentials: {
        token: '',
        testMode: true,
      },
    },
    products: [],
    images: [],
  });

  const updateConfig = (key, value) => {
    setConfig(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => Math.max(0, prev - 1));
  const goToStep = (step) => setCurrentStep(step);

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        config,
        updateConfig,
        nextStep,
        prevStep,
        goToStep,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
}
