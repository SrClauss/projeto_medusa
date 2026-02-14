import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Paper,
  Stack,
  Grid,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  CheckCircle,
  OpenInNew as ExternalLinkIcon,
  ContentCopy as CopyIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { openUrl } from '@tauri-apps/plugin-opener';
import { useWizard } from '../../contexts/WizardContext';

export const CompletionStep = () => {
  const { wizardData, goToStep } = useWizard();

  const isLocal = wizardData.deploymentType === 'local';
  const storeUrl = isLocal ? 'http://localhost:9000' : 
    (wizardData.deployment?.url || `https://${wizardData.server.domain}`);
  const webhookUrl = isLocal ? 'http://localhost:9000/api/webhooks/mercadopago' :
    (wizardData.deployment?.webhookUrl || `https://${wizardData.server.domain}/api/webhooks/mercadopago`);
  const adminUrl = `${storeUrl}/app`;

  const handleOpenStore = async () => {
    try {
      await openUrl(storeUrl);
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  const handleOpenAdmin = async () => {
    try {
      await openUrl(adminUrl);
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  const handleCopyToClipboard = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(`${label} copiado para a área de transferência!`);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const handleStartNew = () => {
    if (confirm('Deseja iniciar uma nova implantação? Os dados atuais serão perdidos.')) {
      window.location.reload();
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', py: 4 }}>
      <Card elevation={2}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={4}>
            {/* Success Header */}
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 80,
                  height: 80,
                  bgcolor: 'success.light',
                  borderRadius: '50%',
                  mb: 2,
                }}
              >
                <CheckCircle sx={{ fontSize: 60, color: 'success.main' }} />
              </Box>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                🎉 Loja Implantada com Sucesso!
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Sua loja <strong>{wizardData.identity.name}</strong> está online e pronta para vendas!
              </Typography>
            </Box>

            {/* Store Information */}
            <Stack spacing={3}>
              {/* Store URL */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(156, 39, 176, 0.1) 100%)',
                  border: 1,
                  borderColor: 'primary.light',
                  borderRadius: 2,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  🌐 URL da Loja (Frontend)
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextField
                    fullWidth
                    value={storeUrl}
                    InputProps={{
                      readOnly: true,
                      sx: { fontFamily: 'monospace', fontSize: '0.875rem' },
                    }}
                    size="small"
                  />
                  <Button
                    variant="contained"
                    onClick={handleOpenStore}
                    startIcon={<ExternalLinkIcon />}
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    Abrir
                  </Button>
                  <IconButton
                    onClick={() => handleCopyToClipboard(storeUrl, 'URL da loja')}
                    title="Copiar URL"
                    color="default"
                  >
                    <CopyIcon />
                  </IconButton>
                </Box>
              </Paper>

              {/* Admin URL */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.1) 0%, rgba(233, 30, 99, 0.1) 100%)',
                  border: 1,
                  borderColor: 'secondary.light',
                  borderRadius: 2,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  🔐 Painel Administrativo (Backend)
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <TextField
                    fullWidth
                    value={adminUrl}
                    InputProps={{
                      readOnly: true,
                      sx: { fontFamily: 'monospace', fontSize: '0.875rem' },
                    }}
                    size="small"
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleOpenAdmin}
                    startIcon={<ExternalLinkIcon />}
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    Abrir
                  </Button>
                  <IconButton
                    onClick={() => handleCopyToClipboard(adminUrl, 'URL do admin')}
                    title="Copiar URL"
                    color="default"
                  >
                    <CopyIcon />
                  </IconButton>
                </Box>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    bgcolor: 'background.paper',
                    border: 1,
                    borderColor: 'divider',
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    <strong>Credenciais padrão:</strong> admin@medusa-test.com / supersecret
                  </Typography>
                  <Typography variant="body2" color="warning.main" sx={{ mt: 1 }}>
                    ⚠️ Altere a senha ao fazer o primeiro login!
                  </Typography>
                </Paper>
              </Paper>

              {/* Webhook URL */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(0, 200, 83, 0.1) 100%)',
                  border: 1,
                  borderColor: 'success.light',
                  borderRadius: 2,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  🔗 Webhook do Mercado Pago
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Configure esta URL no painel do Mercado Pago para receber notificações de pagamento:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <TextField
                    fullWidth
                    value={webhookUrl}
                    InputProps={{
                      readOnly: true,
                      sx: { fontFamily: 'monospace', fontSize: '0.875rem' },
                    }}
                    size="small"
                  />
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => window.open('https://www.mercadopago.com.br/developers/panel/webhooks', '_blank')}
                    startIcon={<ExternalLinkIcon />}
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    Configurar
                  </Button>
                  <IconButton
                    onClick={() => handleCopyToClipboard(webhookUrl, 'Webhook URL')}
                    title="Copiar URL"
                    color="default"
                  >
                    <CopyIcon />
                  </IconButton>
                </Box>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    bgcolor: 'background.paper',
                    border: 1,
                    borderColor: 'success.light',
                  }}
                >
                  <Typography variant="body2" fontWeight="bold" gutterBottom>
                    Eventos a configurar:
                  </Typography>
                  <List dense>
                    <ListItem sx={{ py: 0 }}>
                      <ListItemText 
                        primary="• payment.created"
                        primaryTypographyProps={{ variant: 'caption' }}
                      />
                    </ListItem>
                    <ListItem sx={{ py: 0 }}>
                      <ListItemText 
                        primary="• payment.updated"
                        primaryTypographyProps={{ variant: 'caption' }}
                      />
                    </ListItem>
                    <ListItem sx={{ py: 0 }}>
                      <ListItemText 
                        primary="• merchant_order.updated"
                        primaryTypographyProps={{ variant: 'caption' }}
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Paper>
            </Stack>

            {/* Summary */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                bgcolor: 'grey.50',
                border: 1,
                borderColor: 'divider',
                borderRadius: 2,
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 3 }}>
                📊 Resumo da Implantação
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={6} md={3}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Produtos
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {wizardData.products.csvData.length}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Imagens
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {wizardData.images.mapping?.totalImages || 0}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Design
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" sx={{ textTransform: 'capitalize' }}>
                    {wizardData.design.school}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Pagamento
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    Mercado Pago
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            {/* Next Steps */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                bgcolor: 'info.light',
                border: 1,
                borderColor: 'info.light',
                borderRadius: 2,
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" color="info.dark" gutterBottom>
                📝 Próximos Passos
              </Typography>
              <List>
                {isLocal && (
                  <ListItem>
                    <ListItemText
                      primary="• Container Local: Sua loja está rodando no container 'medusa-project'. Use docker logs medusa-project para ver logs."
                      primaryTypographyProps={{ variant: 'body2', color: 'info.dark' }}
                    />
                  </ListItem>
                )}
                <ListItem>
                  <ListItemText
                    primary="1. Acesse o painel administrativo e altere a senha padrão"
                    primaryTypographyProps={{ variant: 'body2', color: 'info.dark' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="2. Configure o webhook no painel do Mercado Pago"
                    primaryTypographyProps={{ variant: 'body2', color: 'info.dark' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="3. Verifique os produtos e ajuste as informações se necessário"
                    primaryTypographyProps={{ variant: 'body2', color: 'info.dark' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="4. Teste o processo de compra completo em modo de teste"
                    primaryTypographyProps={{ variant: 'body2', color: 'info.dark' }}
                  />
                </ListItem>
                {!isLocal && (
                  <>
                    <ListItem>
                      <ListItemText
                        primary="5. Configure DNS do domínio para apontar para o servidor (se ainda não fez)"
                        primaryTypographyProps={{ variant: 'body2', color: 'info.dark' }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="6. Personalize os e-mails transacionais no painel administrativo"
                        primaryTypographyProps={{ variant: 'body2', color: 'info.dark' }}
                      />
                    </ListItem>
                  </>
                )}
                {isLocal && (
                  <ListItem>
                    <ListItemText
                      primary="5. Para parar o container: docker stop medusa-project"
                      primaryTypographyProps={{ variant: 'body2', color: 'info.dark' }}
                    />
                  </ListItem>
                )}
              </List>
            </Paper>

            {/* Actions */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={handleOpenStore}
                startIcon={<ExternalLinkIcon />}
                sx={{
                  px: 6,
                  py: 2,
                  fontWeight: 'bold',
                  boxShadow: 3,
                  '&:hover': {
                    boxShadow: 6,
                  },
                }}
              >
                Visitar Loja
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={handleStartNew}
                startIcon={<RefreshIcon />}
                sx={{
                  px: 6,
                  py: 2,
                  fontWeight: 'bold',
                }}
              >
                Nova Implantação
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
