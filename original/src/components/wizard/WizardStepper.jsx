import React from 'react';
import { 
  Stepper, 
  Step, 
  StepLabel, 
  Box, 
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useWizard } from '../../contexts/WizardContext';

export const WizardStepper = ({ currentStep }) => {
  const { wizardData } = useWizard();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getSteps = () => {
    const baseSteps = [
      { id: 0, label: 'Tipo', description: 'Tipo de implantação' },
      { id: 1, label: 'Servidor', description: 'Configuração do servidor' },
      { id: 2, label: 'Identidade', description: 'Nome e slogan da loja' },
      { id: 3, label: 'Design', description: 'Escola de design' },
      { id: 4, label: 'Tema', description: 'Cores e tipografia' },
      { id: 5, label: 'Pagamento', description: 'Mercado Pago' },
      { id: 6, label: 'Produtos', description: 'Upload CSV' },
      { id: 7, label: 'Imagens', description: 'Assets de produtos' },
      { id: 8, label: 'Deploy', description: 'Implantação' },
      { id: 9, label: 'Concluído', description: 'Loja pronta' },
    ];

    // Se for deployment local, remove o passo do servidor
    if (wizardData.deploymentType === 'local') {
      return baseSteps.filter(step => step.id !== 1).map((step, index) => ({
        ...step,
        id: index
      }));
    }

    return baseSteps;
  };

  const steps = getSteps();
  const adjustedCurrentStep = wizardData.deploymentType === 'local' && currentStep >= 1 ? currentStep + 1 : currentStep;

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        borderBottom: 1, 
        borderColor: 'divider',
        py: 3,
        px: 2,
        bgcolor: 'background.paper',
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Stepper 
          activeStep={adjustedCurrentStep} 
          alternativeLabel={isMobile}
          orientation={isMobile ? 'vertical' : 'horizontal'}
        >
          {steps.map((step) => (
            <Step key={step.id}>
              <StepLabel
                optional={
                  !isMobile && (
                    <Box 
                      component="span" 
                      sx={{ 
                        fontSize: '0.75rem',
                        color: 'text.secondary',
                        mt: 0.5,
                      }}
                    >
                      {step.description}
                    </Box>
                  )
                }
              >
                <Box 
                  component="span" 
                  sx={{ 
                    fontWeight: step.id === adjustedCurrentStep ? 600 : 500,
                    fontSize: isMobile ? '0.875rem' : '0.9375rem',
                  }}
                >
                  {step.label}
                </Box>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Paper>
  );
};
