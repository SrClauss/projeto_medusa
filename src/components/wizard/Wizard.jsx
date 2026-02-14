import React from 'react';
import { WizardProvider, useWizard } from '../../contexts/WizardContext';
import { WizardStepper } from './WizardStepper';
import { ServerStep } from './ServerStep';
import { IdentityStep } from './IdentityStep';
import { DesignSchoolStep } from './DesignSchoolStep';
import { ThemeStep } from './ThemeStep';
import { PaymentStep } from './PaymentStep';
import { ProductsStep } from './ProductsStep';
import { ImagesStep } from './ImagesStep';
import { DeployStep } from './DeployStep';
import { CompletionStep } from './CompletionStep';

const WizardContent = () => {
  const { currentStep } = useWizard();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <ServerStep />;
      case 1:
        return <IdentityStep />;
      case 2:
        return <DesignSchoolStep />;
      case 3:
        return <ThemeStep />;
      case 4:
        return <PaymentStep />;
      case 5:
        return <ProductsStep />;
      case 6:
        return <ImagesStep />;
      case 7:
        return <DeployStep />;
      case 8:
        return <CompletionStep />;
      default:
        return <ServerStep />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <WizardStepper currentStep={currentStep} />
      <div className="py-8">
        {renderStep()}
      </div>
    </div>
  );
};

export const Wizard = () => {
  return (
    <WizardProvider>
      <WizardContent />
    </WizardProvider>
  );
};
