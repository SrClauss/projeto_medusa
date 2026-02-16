import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  AlertTitle,
  FormControlLabel,
  Checkbox,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  CircularProgress,
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  ArrowForward,
  ArrowBack,
  Visibility,
  VisibilityOff,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { useWizard } from '../../contexts/WizardContext';

export const PaymentStep = () => {
  const { wizardData, updateWizardData, nextStep, prevStep } = useWizard();
  const [showToken, setShowToken] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);

  if (!wizardData.payment) {
    updateWizardData('payment', {
      mercadoPagoToken: '',
      webhookSecret: '',
      testMode: true,
    });
  }

  const handleTestConnection = async () => {
    setTestingConnection(true);
    setConnectionStatus(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (wizardData.payment?.mercadoPagoToken?.length > 10) {
        setConnectionStatus('success');
      } else {
        setConnectionStatus('error');
      }
    } catch (error) {
      setConnectionStatus('error');
    } finally {
      setTestingConnection(false);
    }
  };

  const canContinue = wizardData.payment?.mercadoPagoToken;
  const isTestMode = wizardData.payment?.testMode !== false;

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', py: 4 }}>
      <Card elevation={2}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CreditCardIcon sx={{ fontSize: 40, color: 'success.main' }} />
              <Typography variant="h4" component="h2" fontWeight="bold">
                Configuração de Pagamento
              </Typography>
            </Box>
            
            <Typography variant="body1" color="text.secondary">
              Configure sua integração com o Mercado Pago. O token será usado para processar pagamentos
              e os webhooks notificarão sua loja sobre mudanças de status dos pedidos.
            </Typography>

            <Alert severity="warning" icon={<WarningIcon />}>
              <AlertTitle>Modo de Teste</AlertTitle>
              <Typography variant="body2" paragraph>
                No modo de teste, você pode usar credenciais de teste do Mercado Pago
                sem processar pagamentos reais.
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isTestMode}
                    onChange={(e) => updateWizardData('payment', { testMode: e.target.checked })}
                    color="warning"
                  />
                }
                label="Usar modo de teste (recomendado para desenvolvimento)"
              />
            </Alert>

            <TextField
              fullWidth
              label={isTestMode ? 'Token de Teste do Mercado Pago' : 'Token de Produção do Mercado Pago'}
              type={showToken ? 'text' : 'password'}
              placeholder={isTestMode ? 'TEST-1234567890-abcdef...' : 'APP_USR-1234567890-abcdef...'}
              value={wizardData.payment?.mercadoPagoToken || ''}
              onChange={(e) => updateWizardData('payment', { mercadoPagoToken: e.target.value })}
              required
              variant="outlined"
              InputProps={{
                sx: { fontFamily: 'monospace', fontSize: '0.875rem' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowToken(!showToken)}
                      edge="end"
                    >
                      {showToken ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText={
                <>
                  {isTestMode ? 'Obtenha seu token de teste em: ' : 'Obtenha seu token de produção em: '}
                  <Link
                    href="https://www.mercadopago.com.br/developers/panel/credentials"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {isTestMode ? 'Credenciais de Teste' : 'Credenciais de Produção'}
                  </Link>
                </>
              }
            />

            {wizardData.payment?.mercadoPagoToken && (
              <Box>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={handleTestConnection}
                  disabled={testingConnection}
                  startIcon={testingConnection ? <CircularProgress size={20} /> : null}
                >
                  {testingConnection ? 'Testando conexão...' : 'Testar Conexão'}
                </Button>
              </Box>
            )}

            {connectionStatus === 'success' && (
              <Alert severity="success" icon={<CheckCircleIcon />}>
                <AlertTitle>Token válido!</AlertTitle>
                Conexão com Mercado Pago estabelecida com sucesso.
              </Alert>
            )}

            {connectionStatus === 'error' && (
              <Alert severity="error">
                <AlertTitle>Token inválido</AlertTitle>
                Não foi possível validar o token. Verifique se está correto.
              </Alert>
            )}

            <Card variant="outlined" sx={{ bgcolor: 'info.lighter' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Configuração de Webhook
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Após a implantação, configure o webhook no painel do Mercado Pago com a URL:
                </Typography>
                <Box 
                  sx={{ 
                    p: 2, 
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                  }}
                >
                  {wizardData.server?.domain 
                    ? `https://${wizardData.server.domain}/api/webhooks/mercadopago`
                    : 'https://sua-loja.com/api/webhooks/mercadopago'
                  }
                </Box>
              </CardContent>
            </Card>

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
                color="success"
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
