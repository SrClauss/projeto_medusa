import React from 'react';
import { 
  Box,
  Card,
  CardContent,
  CardActionArea,
  Button,
  Typography,
  Grid,
  Stack,
  Chip,
} from '@mui/material';
import { 
  Palette as PaletteIcon, 
  ArrowForward, 
  ArrowBack, 
  CheckCircle 
} from '@mui/icons-material';
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
    <Box sx={{ py: 4 }}>
      <Card elevation={2}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <PaletteIcon sx={{ fontSize: 40, color: 'error.main' }} />
              <Typography variant="h4" component="h2" fontWeight="bold">
                Escola de Design
              </Typography>
            </Box>
            
            <Typography variant="body1" color="text.secondary">
              Escolha uma escola de design visual para sua loja. Você poderá personalizar
              cores e tipografia na próxima etapa.
            </Typography>

            <Grid container spacing={3} sx={{ mt: 1 }}>
              {DESIGN_SCHOOLS.map((school) => (
                <Grid item xs={12} sm={6} md={4} key={school.id}>
                  <Card 
                    elevation={wizardData.design.school === school.id ? 4 : 1}
                    sx={{
                      height: '100%',
                      border: 2,
                      borderColor: wizardData.design.school === school.id 
                        ? 'error.main' 
                        : 'transparent',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                    }}
                  >
                    <CardActionArea onClick={() => handleSelectSchool(school)}>
                      <Box
                        sx={{
                          height: 140,
                          background: school.preview,
                          position: 'relative',
                        }}
                      >
                        {wizardData.design.school === school.id && (
                          <CheckCircle 
                            sx={{ 
                              position: 'absolute',
                              top: 12,
                              right: 12,
                              fontSize: 32,
                              color: 'error.main',
                              bgcolor: 'white',
                              borderRadius: '50%',
                            }} 
                          />
                        )}
                      </Box>
                      <CardContent>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                          {school.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {school.description}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          {school.colors.map((color, i) => (
                            <Box
                              key={i}
                              sx={{
                                width: 32,
                                height: 32,
                                borderRadius: 1,
                                bgcolor: color,
                                border: 1,
                                borderColor: 'divider',
                              }}
                              title={color}
                            />
                          ))}
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>

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
                disabled={!canContinue}
                endIcon={<ArrowForward />}
                color="error"
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
