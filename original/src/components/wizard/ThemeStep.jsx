import React from 'react';
import { 
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
  Stack,
  Paper,
  TextField,
} from '@mui/material';
import { 
  Brush as BrushIcon, 
  ArrowForward, 
  ArrowBack 
} from '@mui/icons-material';
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
    <Box sx={{ py: 4 }}>
      <Card elevation={2}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <BrushIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              <Typography variant="h4" component="h2" fontWeight="bold">
                Personalização do Tema
              </Typography>
            </Box>
            
            <Typography variant="body1" color="text.secondary">
              Personalize as cores e tipografia da sua loja baseado na escola de design selecionada.
            </Typography>

            {/* Colors Section */}
            <Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Cores
              </Typography>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} md={4}>
                  <Stack spacing={1}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Cor Primária
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        component="input"
                        type="color"
                        value={wizardData.design.primaryColor}
                        onChange={(e) => updateWizardData('design', { primaryColor: e.target.value })}
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: 2,
                          border: 1,
                          borderColor: 'divider',
                          cursor: 'pointer',
                        }}
                      />
                      <Box>
                        <Typography variant="body2" fontFamily="monospace" color="text.secondary">
                          {wizardData.design.primaryColor}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Botões e destaques
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Stack spacing={1}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Cor Secundária
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        component="input"
                        type="color"
                        value={wizardData.design.secondaryColor}
                        onChange={(e) => updateWizardData('design', { secondaryColor: e.target.value })}
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: 2,
                          border: 1,
                          borderColor: 'divider',
                          cursor: 'pointer',
                        }}
                      />
                      <Box>
                        <Typography variant="body2" fontFamily="monospace" color="text.secondary">
                          {wizardData.design.secondaryColor}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Links e acentos
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Stack spacing={1}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Cor de Fundo
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        component="input"
                        type="color"
                        value={wizardData.design.backgroundColor}
                        onChange={(e) => updateWizardData('design', { backgroundColor: e.target.value })}
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: 2,
                          border: 1,
                          borderColor: 'divider',
                          cursor: 'pointer',
                        }}
                      />
                      <Box>
                        <Typography variant="body2" fontFamily="monospace" color="text.secondary">
                          {wizardData.design.backgroundColor}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Plano de fundo
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </Box>

            {/* Typography Section */}
            <Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Tipografia
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {FONT_PAIRS.map((pair) => (
                  <Grid item xs={12} sm={6} key={pair.id}>
                    <Card 
                      variant="outlined"
                      sx={{
                        cursor: 'pointer',
                        border: 2,
                        borderColor: wizardData.design.fontPair === `${pair.primary} + ${pair.secondary}`
                          ? 'primary.main'
                          : 'divider',
                        bgcolor: wizardData.design.fontPair === `${pair.primary} + ${pair.secondary}`
                          ? 'primary.lighter'
                          : 'background.paper',
                        transition: 'all 0.2s',
                        '&:hover': {
                          borderColor: 'primary.light',
                        },
                      }}
                      onClick={() => updateWizardData('design', { fontPair: `${pair.primary} + ${pair.secondary}` })}
                    >
                      <CardContent>
                        <Typography 
                          variant="h6" 
                          fontWeight="bold" 
                          sx={{ fontFamily: pair.primary }}
                          gutterBottom
                        >
                          {pair.primary}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontFamily: pair.secondary }}
                        >
                          {pair.secondary}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Preview Section */}
            <Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Prévia
              </Typography>
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  bgcolor: wizardData.design.backgroundColor,
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{ color: wizardData.design.primaryColor }}
                  gutterBottom
                >
                  {wizardData.identity.name || 'Nome da Loja'}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ 
                    color: wizardData.design.secondaryColor,
                    mb: 3,
                  }}
                >
                  {wizardData.identity.slogan || 'Slogan da loja'}
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: wizardData.design.primaryColor,
                    '&:hover': {
                      bgcolor: wizardData.design.primaryColor,
                      opacity: 0.9,
                    },
                  }}
                >
                  Ver Produtos
                </Button>
              </Paper>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
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
                endIcon={<ArrowForward />}
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
