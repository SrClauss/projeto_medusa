import React from 'react';
import { 
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
} from '@mui/material';
import { 
  Storefront, 
  ArrowForward, 
  ArrowBack 
} from '@mui/icons-material';
import { useWizard } from '../../contexts/WizardContext';

export const IdentityStep = () => {
  const { wizardData, updateWizardData, nextStep, prevStep } = useWizard();

  const canContinue = wizardData.identity.name && wizardData.identity.slogan;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', py: 4 }}>
      <Card elevation={2}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Storefront sx={{ fontSize: 40, color: 'secondary.main' }} />
              <Typography variant="h4" component="h2" fontWeight="bold">
                Identidade da Loja
              </Typography>
            </Box>
            
            <Typography variant="body1" color="text.secondary">
              Defina o nome e o slogan da sua loja. Essas informações serão exibidas no frontend
              e utilizadas para configurar o backend.
            </Typography>

            <TextField
              fullWidth
              label="Nome da Loja"
              placeholder="Minha Loja Incrível"
              value={wizardData.identity.name}
              onChange={(e) => updateWizardData('identity', { name: e.target.value })}
              variant="outlined"
              required
              helperText="Este será o nome exibido no cabeçalho e metadados do site"
            />

            <TextField
              fullWidth
              label="Slogan"
              placeholder="Os melhores produtos para você"
              value={wizardData.identity.slogan}
              onChange={(e) => updateWizardData('identity', { slogan: e.target.value })}
              variant="outlined"
              required
              helperText="Uma frase curta e impactante que representa sua loja"
            />

            {canContinue && (
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  bgcolor: 'secondary.light',
                  borderRadius: 2,
                }}
              >
                <Typography variant="subtitle2" fontWeight="bold" color="secondary.dark" gutterBottom>
                  Prévia
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="secondary.dark">
                  {wizardData.identity.name}
                </Typography>
                <Typography variant="body1" color="secondary.dark" fontStyle="italic">
                  {wizardData.identity.slogan}
                </Typography>
              </Paper>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                variant="outlined"
                size="large"
                onClick={prevStep}
                startIcon={<ArrowBack />}
              >
                Voltar
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={nextStep}
                disabled={!canContinue}
                endIcon={<ArrowForward />}
                color="secondary"
              >
                Continuar
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
