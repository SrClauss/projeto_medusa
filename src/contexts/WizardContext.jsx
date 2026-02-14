import React, { createContext, useContext, useState } from 'react';

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

  const updateWizardData = (section, data) => {
    setWizardData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => Math.max(0, prev - 1));
  const goToStep = (step) => setCurrentStep(step);

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
        updateWizardData,
        nextStep,
        prevStep,
        goToStep,
        addLog,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};
