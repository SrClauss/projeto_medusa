import React from 'react';
import { Box, Container } from '@mui/material';
import { WizardProvider, useWizard } from '../../contexts/WizardContext';
import { WizardStepper } from './WizardStepper';
import { YamlNavigator } from './YamlNavigator';
import { DeploymentTypeStep } from './DeploymentTypeStep';
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
  const { currentStep, wizardData } = useWizard();

  const renderStep = () => {
    let stepIndex = currentStep;

    // Se for deployment local, pula o ServerStep (passo 1)
    if (wizardData.deploymentType === 'local' && stepIndex >= 1) {
      stepIndex += 1;
    }

    switch (stepIndex) {
      case 0:
        return <DeploymentTypeStep />;
      case 1:
        return <ServerStep />;
      case 2:
        return <IdentityStep />;
      case 3:
        return <DesignSchoolStep />;
      case 4:
        return <ThemeStep />;
      case 5:
        return <PaymentStep />;
      case 6:
        return <ProductsStep />;
      case 7:
        return <ImagesStep />;
      case 8:
        return <DeployStep />;
      case 9:
        return <CompletionStep />;
      default:
        return <DeploymentTypeStep />;
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: 'background.default',
    }}>
      <WizardStepper currentStep={currentStep} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <YamlNavigator />
        {renderStep()}
      </Container>
    </Box>
  );
};

export const Wizard = () => {
  return (
    <WizardProvider>
      <WizardContent />
    </WizardProvider>
  );
};
