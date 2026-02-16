import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Paper,
  Stack,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Rocket as RocketIcon,
  CheckCircle,
  Error as ErrorIcon,
  ArrowBack,
} from '@mui/icons-material';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import { useWizard } from '../../contexts/WizardContext';

export const DeployStep = () => {
  const { wizardData, updateWizardData, nextStep, prevStep } = useWizard();
  const [deploying, setDeploying] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState('idle'); // idle, deploying, success, error
  const [logs, setLogs] = useState([]);
  const logsEndRef = useRef(null);

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  useEffect(() => {
    // Listen for deployment logs from Rust
    const unlisten = listen('deployment-log', (event) => {
      const logEntry = {
        timestamp: new Date().toISOString(),
        message: event.payload,
      };
      setLogs(prev => [...prev, logEntry]);
    });

    return () => {
      unlisten.then(fn => fn());
    };
  }, []);

  const handleDeploy = async () => {
    setDeploying(true);
    setDeploymentStatus('deploying');
    setLogs([{ timestamp: new Date().toISOString(), message: '🚀 Iniciando implantação...' }]);

    try {
      const result = await invoke('deploy_store', {
        config: {
          deploymentType: wizardData.deploymentType,
          ...(wizardData.deploymentType === 'remote' && { server: wizardData.server }),
          identity: wizardData.identity,
          design: wizardData.design,
          payment: wizardData.payment,
          products: wizardData.products.csvData,
          imagesMapping: wizardData.images.mapping,
        },
      });

      setDeploymentStatus('success');
      updateWizardData('deployment', {
        status: 'success',
        url: result.url,
        webhookUrl: result.webhookUrl,
      });
      
      setLogs(prev => [...prev, {
        timestamp: new Date().toISOString(),
        message: `✅ Implantação concluída com sucesso!\n🌐 URL: ${result.url}`,
      }]);

      // Auto-advance to completion screen after a delay
      setTimeout(() => nextStep(), 2000);
    } catch (error) {
      setDeploymentStatus('error');
      updateWizardData('deployment', { status: 'error' });
      setLogs(prev => [...prev, {
        timestamp: new Date().toISOString(),
        message: `❌ Erro na implantação: ${error.toString()}`,
      }]);
    } finally {
      setDeploying(false);
    }
  };

  const canStart = deploymentStatus === 'idle' || deploymentStatus === 'error';

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', py: 4 }}>
      <Card elevation={2}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <RocketIcon sx={{ fontSize: 40, color: 'info.main' }} />
              <Typography variant="h4" component="h2" fontWeight="bold">
                Implantação da Loja
              </Typography>
            </Box>
            
            {deploymentStatus === 'idle' && (
              <Box>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Tudo pronto para iniciar a implantação! Clique no botão abaixo para começar
                  o processo de deploy da sua loja.
                </Typography>

                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 4, 
                    mb: 4,
                    bgcolor: 'grey.50',
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 3 }}>
                    Resumo da configuração:
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="text.secondary">
                        Servidor:
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {wizardData.server.ip}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="text.secondary">
                        Domínio:
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {wizardData.server.domain}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="text.secondary">
                        Nome da Loja:
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {wizardData.identity.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="text.secondary">
                        Escola de Design:
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {wizardData.design.school}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="text.secondary">
                        Produtos:
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {wizardData.products.csvData.length} produtos
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="text.secondary">
                        Gateway de Pagamento:
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        Mercado Pago ({wizardData.payment?.testMode ? 'Teste' : 'Produção'})
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>

                <Box sx={{ textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    size="large"
                    color="info"
                    onClick={handleDeploy}
                    startIcon={<RocketIcon />}
                    sx={{
                      px: 6,
                      py: 2,
                      fontSize: '1.125rem',
                      fontWeight: 'bold',
                      boxShadow: 3,
                      '&:hover': {
                        boxShadow: 6,
                      },
                    }}
                  >
                    Iniciar Implantação
                  </Button>
                </Box>
              </Box>
            )}

            {(deploymentStatus === 'deploying' || deploymentStatus === 'success' || deploymentStatus === 'error') && (
              <Box>
                {deploymentStatus === 'deploying' && (
                  <Alert 
                    severity="info"
                    icon={<CircularProgress size={20} />}
                    sx={{ mb: 3 }}
                  >
                    <Typography variant="body2" fontWeight="bold">
                      Implantando sua loja...
                    </Typography>
                    <Typography variant="body2">
                      Este processo pode levar alguns minutos.
                    </Typography>
                  </Alert>
                )}

                {deploymentStatus === 'success' && (
                  <Alert 
                    severity="success"
                    icon={<CheckCircle />}
                    sx={{ mb: 3 }}
                  >
                    <Typography variant="body2" fontWeight="bold">
                      Implantação concluída com sucesso!
                    </Typography>
                    <Typography variant="body2">
                      Sua loja está online e pronta para uso.
                    </Typography>
                  </Alert>
                )}

                {deploymentStatus === 'error' && (
                  <Alert 
                    severity="error"
                    icon={<ErrorIcon />}
                    sx={{ mb: 3 }}
                  >
                    <Typography variant="body2" fontWeight="bold">
                      Erro na implantação
                    </Typography>
                    <Typography variant="body2">
                      Verifique os logs abaixo para mais detalhes.
                    </Typography>
                  </Alert>
                )}

                {/* Terminal/Logs */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                    Logs de Implantação:
                  </Typography>
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: 'grey.900',
                      color: 'grey.100',
                      borderRadius: 2,
                      height: 480,
                      overflow: 'auto',
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                    }}
                  >
                    {logs.map((log, index) => (
                      <Box key={index} sx={{ mb: 1 }}>
                        <Typography 
                          component="span" 
                          sx={{ 
                            color: 'grey.500',
                            fontFamily: 'monospace',
                            fontSize: '0.875rem',
                          }}
                        >
                          [{new Date(log.timestamp).toLocaleTimeString()}]
                        </Typography>{' '}
                        <Typography 
                          component="span"
                          sx={{ 
                            whiteSpace: 'pre-wrap',
                            fontFamily: 'monospace',
                            fontSize: '0.875rem',
                          }}
                        >
                          {log.message}
                        </Typography>
                      </Box>
                    ))}
                    <div ref={logsEndRef} />
                  </Paper>
                </Box>

                {deploymentStatus === 'error' && (
                  <Box sx={{ textAlign: 'center' }}>
                    <Button
                      variant="contained"
                      size="large"
                      color="info"
                      onClick={handleDeploy}
                      startIcon={<RocketIcon />}
                    >
                      Tentar Novamente
                    </Button>
                  </Box>
                )}
              </Box>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              {canStart && (
                <Button
                  variant="outlined"
                  size="large"
                  onClick={prevStep}
                  startIcon={<ArrowBack />}
                >
                  Voltar
                </Button>
              )}
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
