import React from 'react';
import { 
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Chip,
  Alert,
  AlertTitle,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import { 
  Description as FileTextIcon, 
  ChevronRight, 
  Refresh as RotateCcwIcon, 
  Download as DownloadIcon, 
  Upload as UploadIcon 
} from '@mui/icons-material';
import { useWizard } from '../../contexts/WizardContext';

export const YamlNavigator = () => {
  const {
    yamlSteps,
    hasSavedState,
    currentStep,
    navigateToYamlStep,
    resetWizard,
    loadFromYaml
  } = useWizard();

  if (!hasSavedState || yamlSteps.length === 0) {
    return (
      <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
        <AlertTitle sx={{ display: 'flex', alignItems: 'center' }}>
          <FileTextIcon sx={{ mr: 1, fontSize: 20 }} />
          Nenhum progresso salvo em YAML
        </AlertTitle>
        Os passos serão automaticamente salvos em YAML conforme você avança no wizard.
      </Alert>
    );
  }

  return (
    <Card elevation={1} sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FileTextIcon sx={{ color: 'info.main', mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Navegação YAML
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Tooltip title="Recarregar do YAML">
              <Button
                size="small"
                variant="contained"
                color="success"
                onClick={loadFromYaml}
                startIcon={<UploadIcon />}
              >
                Carregar
              </Button>
            </Tooltip>
            <Tooltip title="Resetar wizard">
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={resetWizard}
                startIcon={<RotateCcwIcon />}
              >
                Reset
              </Button>
            </Tooltip>
          </Stack>
        </Box>

        <Stack spacing={1.5}>
          {yamlSteps.map((step, index) => (
            <Card
              key={step.id}
              variant="outlined"
              sx={{
                cursor: 'pointer',
                border: 1,
                borderColor: step.id === currentStep 
                  ? 'info.main'
                  : step.completed 
                  ? 'success.main'
                  : 'divider',
                bgcolor: step.id === currentStep 
                  ? 'info.lighter'
                  : step.completed 
                  ? 'success.lighter'
                  : 'background.paper',
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: 2,
                },
              }}
              onClick={() => navigateToYamlStep(step.id)}
            >
              <CardContent sx={{ 
                p: 2, 
                '&:last-child': { pb: 2 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      bgcolor: step.id === currentStep 
                        ? 'info.main'
                        : step.completed 
                        ? 'success.main'
                        : 'grey.400',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.875rem',
                    }}
                  >
                    {step.id + 1}
                  </Box>
                  <Box>
                    <Typography 
                      variant="body1" 
                      fontWeight="bold"
                      color={step.id === currentStep ? 'info.dark' : 'text.primary'}
                    >
                      {step.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {step.completed ? 'Concluído' : 'Pendente'}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {step.id === currentStep && (
                    <Chip 
                      label="Atual" 
                      size="small" 
                      color="info"
                    />
                  )}
                  <ChevronRight 
                    sx={{ 
                      color: step.id === currentStep ? 'info.main' : 'grey.400' 
                    }} 
                  />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>

        <Alert severity="info" variant="outlined" sx={{ mt: 2 }}>
          <AlertTitle sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
            Arquivo: <code>medusa-wizard.yml</code>
          </AlertTitle>
          <Typography variant="caption">
            <strong>Local:</strong> Pasta de documentos do sistema<br/>
            O progresso é automaticamente salvo em YAML. Você pode navegar livremente entre os passos.
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  );
};