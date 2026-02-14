import React, { useState } from 'react';
import { 
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Stack,
} from '@mui/material';
import { 
  Storage as StorageIcon, 
  CheckCircle, 
  Error as ErrorIcon 
} from '@mui/icons-material';
import { invoke } from '@tauri-apps/api/core';
import { useWizard } from '../../contexts/WizardContext';

export const ServerStep = () => {
  const { wizardData, updateWizardData, nextStep } = useWizard();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConnect = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await invoke('connect_ssh', {
        ip: wizardData.server.ip,
        domain: wizardData.server.domain,
      });
      
      updateWizardData('server', { connected: true });
      setTimeout(nextStep, 1000);
    } catch (err) {
      setError(err.toString());
      updateWizardData('server', { connected: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', py: 4 }}>
      <Card elevation={2}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <StorageIcon sx={{ fontSize: 40, color: 'info.main' }} />
              <Typography variant="h4" component="h2" fontWeight="bold">
                Configuração do Servidor
              </Typography>
            </Box>
            
            <Typography variant="body1" color="text.secondary">
              Informe os dados do seu servidor Linux. A conexão SSH será estabelecida automaticamente
              usando sua chave pública padrão (~/.ssh/id_rsa.pub).
            </Typography>

            <TextField
              fullWidth
              label="Endereço IP do Servidor"
              placeholder="192.168.1.100"
              value={wizardData.server.ip}
              onChange={(e) => updateWizardData('server', { ip: e.target.value })}
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Domínio da Loja"
              placeholder="minha-loja.com"
              value={wizardData.server.domain}
              onChange={(e) => updateWizardData('server', { domain: e.target.value })}
              variant="outlined"
            />

            {error && (
              <Alert 
                severity="error" 
                icon={<ErrorIcon />}
                sx={{ borderRadius: 2 }}
              >
                <Typography variant="subtitle2" fontWeight="bold">
                  Erro ao conectar
                </Typography>
                <Typography variant="body2">
                  {error}
                </Typography>
              </Alert>
            )}

            {wizardData.server.connected && (
              <Alert 
                severity="success" 
                icon={<CheckCircle />}
                sx={{ borderRadius: 2 }}
              >
                <Typography variant="subtitle2" fontWeight="bold">
                  Conectado com sucesso!
                </Typography>
              </Alert>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleConnect}
                disabled={!wizardData.server.ip || !wizardData.server.domain || loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                sx={{ minWidth: 200 }}
              >
                {loading ? 'Conectando...' : 'Conectar e Continuar'}
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
