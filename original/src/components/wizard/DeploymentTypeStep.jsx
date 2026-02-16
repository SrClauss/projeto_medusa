import React from 'react';
import { 
  Box,
  Card,
  CardContent,
  CardActionArea,
  Button,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from '@mui/material';
import { 
  Storage as ServerIcon, 
  Computer as ContainerIcon, 
  ArrowForward,
  CheckCircle,
} from '@mui/icons-material';
import { useWizard } from '../../contexts/WizardContext';

export const DeploymentTypeStep = () => {
  const { wizardData, updateWizardData, nextStep } = useWizard();

  const handleSelectType = (type) => {
    updateWizardData('deploymentType', type);
    nextStep();
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', py: 4 }}>
      <Card elevation={2}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
                Escolha o Tipo de Implantação
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Como você gostaria de implantar sua loja Medusa?
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {/* Opção Servidor Remoto */}
              <Grid item xs={12} md={6}>
                <Card 
                  elevation={wizardData.deploymentType === 'remote' ? 4 : 1}
                  sx={{
                    height: '100%',
                    border: 2,
                    borderColor: wizardData.deploymentType === 'remote' 
                      ? 'info.main' 
                      : 'transparent',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <CardActionArea 
                    onClick={() => handleSelectType('remote')}
                    sx={{ height: '100%' }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <ServerIcon sx={{ fontSize: 40, color: 'info.main', mr: 2 }} />
                        <Typography variant="h5" fontWeight="bold">
                          Servidor Remoto
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Implante em um servidor Linux remoto via SSH. Ideal para produção com domínio personalizado.
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircle fontSize="small" color="info" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Conexão SSH automática"
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircle fontSize="small" color="info" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="SSL automático (Let's Encrypt)"
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircle fontSize="small" color="info" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Domínio personalizado"
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircle fontSize="small" color="info" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Infraestrutura completa"
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>

              {/* Opção Container Local */}
              <Grid item xs={12} md={6}>
                <Card 
                  elevation={wizardData.deploymentType === 'local' ? 4 : 1}
                  sx={{
                    height: '100%',
                    border: 2,
                    borderColor: wizardData.deploymentType === 'local' 
                      ? 'success.main' 
                      : 'transparent',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <CardActionArea 
                    onClick={() => handleSelectType('local')}
                    sx={{ height: '100%' }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <ContainerIcon sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
                        <Typography variant="h5" fontWeight="bold">
                          Container Local
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Execute localmente em um container Docker. <strong>Perfeito para testes e desenvolvimento</strong> - sem necessidade de configurar servidor ou domínio.
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircle fontSize="small" color="success" />
                          </ListItemIcon>
                          <ListItemText 
                            primary='Container "medusa-project"'
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircle fontSize="small" color="success" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Acesso via localhost"
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircle fontSize="small" color="success" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Configuração rápida"
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircle fontSize="small" color="success" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={<strong>Sem servidor remoto</strong>}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                variant="contained"
                size="large"
                onClick={nextStep}
                disabled={!wizardData.deploymentType}
                endIcon={<ArrowForward />}
                sx={{ minWidth: 200 }}
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