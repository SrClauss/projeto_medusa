import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Paper,
  Stack,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  Image as ImageIcon,
  ArrowForward,
  ArrowBack,
  FolderOpen,
  CheckCircle,
  Error as AlertCircleIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { open } from '@tauri-apps/plugin-dialog';
import { invoke } from '@tauri-apps/api/core';
import { useWizard } from '../../contexts/WizardContext';

export const ImagesStep = () => {
  const { wizardData, updateWizardData, nextStep, prevStep } = useWizard();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mapping, setMapping] = useState(null);

  const handleDirectorySelect = async () => {
    try {
      const selected = await open({
        directory: true,
        multiple: false,
      });

      if (selected) {
        setLoading(true);
        setError(null);
        
        // Scan directory and map images to products
        const result = await invoke('scan_images_directory', {
          directory: selected,
          products: wizardData.products.csvData,
        });
        
        setMapping(result);
        updateWizardData('images', {
          directory: selected,
          mapping: result,
        });
        
        setLoading(false);
      }
    } catch (err) {
      setError(`Erro ao escanear diretório: ${err.toString()}`);
      setLoading(false);
    }
  };

  const hasImages = wizardData.images.directory && wizardData.images.mapping;
  const mappingData = wizardData.images.mapping || mapping;

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', py: 4 }}>
      <Card elevation={2}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <ImageIcon sx={{ fontSize: 40, color: 'info.main' }} />
              <Typography variant="h4" component="h2" fontWeight="bold">
                Imagens dos Produtos
              </Typography>
            </Box>
            
            <Typography variant="body1" color="text.secondary">
              Selecione o diretório raiz contendo as imagens dos produtos. Cada subpasta deve ter o nome
              igual ao <strong>codigo_interno</strong> do produto e conter as imagens correspondentes.
            </Typography>

            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                bgcolor: 'info.lighter',
                border: 1,
                borderColor: 'info.main',
                borderRadius: 2,
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" color="info.dark" gutterBottom>
                Estrutura esperada:
              </Typography>
              <Paper
                sx={{
                  p: 2,
                  bgcolor: 'background.paper',
                  border: 1,
                  borderColor: 'info.light',
                  borderRadius: 1,
                  overflowX: 'auto',
                }}
              >
                <Typography 
                  component="pre" 
                  variant="body2" 
                  color="info.dark"
                  sx={{ 
                    fontFamily: 'monospace',
                    m: 0,
                    whiteSpace: 'pre',
                  }}
                >
{`imagens/
├── 1/
│   ├── foto1.jpg
│   ├── foto2.jpg
│   └── foto3.png
├── 2/
│   ├── produto.jpg
│   └── detalhe.webp
└── 3/
    └── imagem.jpg`}
                </Typography>
              </Paper>
              <Typography variant="body2" color="info.dark" sx={{ mt: 2 }}>
                Os nomes das subpastas (1, 2, 3) devem corresponder ao <strong>codigo_interno</strong> dos produtos.
              </Typography>
            </Paper>

            {!hasImages ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <FolderOpen sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Nenhum diretório selecionado
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  color="info"
                  onClick={handleDirectorySelect}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <FolderOpen />}
                >
                  {loading ? 'Escaneando...' : 'Selecionar Diretório'}
                </Button>
              </Box>
            ) : (
              <Box>
                <Alert 
                  severity="success" 
                  icon={<CheckCircle />}
                  sx={{ mb: 3 }}
                >
                  <Typography variant="body2" fontWeight="bold">
                    Diretório escaneado com sucesso!
                  </Typography>
                  <Typography variant="body2">
                    {wizardData.images.directory}
                  </Typography>
                </Alert>

                {/* Summary */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12} md={4}>
                    <Paper 
                      elevation={0}
                      sx={{ 
                        p: 3, 
                        bgcolor: 'primary.light',
                        border: 1,
                        borderColor: 'primary.light',
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="h4" fontWeight="bold" color="primary.dark">
                        {mappingData?.productsWithImages || 0}
                      </Typography>
                      <Typography variant="body2" color="primary.dark">
                        Produtos com imagens
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper 
                      elevation={0}
                      sx={{ 
                        p: 3, 
                        bgcolor: 'warning.light',
                        border: 1,
                        borderColor: 'warning.light',
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="h4" fontWeight="bold" color="warning.dark">
                        {mappingData?.productsWithoutImages || 0}
                      </Typography>
                      <Typography variant="body2" color="warning.dark">
                        Produtos sem imagens
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper 
                      elevation={0}
                      sx={{ 
                        p: 3, 
                        bgcolor: 'secondary.light',
                        border: 1,
                        borderColor: 'secondary.light',
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="h4" fontWeight="bold" color="secondary.dark">
                        {mappingData?.totalImages || 0}
                      </Typography>
                      <Typography variant="body2" color="secondary.dark">
                        Total de imagens
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                {/* Warnings */}
                {mappingData?.productsWithoutImages > 0 && (
                  <Alert 
                    severity="warning"
                    icon={<AlertCircleIcon />}
                    sx={{ mb: 3 }}
                  >
                    <Typography variant="body2" fontWeight="bold">
                      {mappingData.productsWithoutImages} produto(s) sem imagens
                    </Typography>
                    <Typography variant="body2">
                      Estes produtos serão criados sem imagens. Você pode adicionar imagens depois.
                    </Typography>
                    {mappingData.missingFolders && mappingData.missingFolders.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="caption" fontWeight="bold">
                          Pastas não encontradas:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                          {mappingData.missingFolders.slice(0, 10).map((folder, i) => (
                            <Chip 
                              key={i}
                              label={folder}
                              size="small"
                              sx={{ 
                                fontFamily: 'monospace',
                                bgcolor: 'warning.light',
                              }}
                            />
                          ))}
                          {mappingData.missingFolders.length > 10 && (
                            <Typography variant="caption" color="text.secondary">
                              +{mappingData.missingFolders.length - 10} mais
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    )}
                  </Alert>
                )}

                {mappingData?.orphanFolders && mappingData.orphanFolders.length > 0 && (
                  <Alert 
                    severity="info"
                    icon={<AlertCircleIcon />}
                    sx={{ mb: 3 }}
                  >
                    <Typography variant="body2" fontWeight="bold">
                      {mappingData.orphanFolders.length} pasta(s) órfã(s) encontrada(s)
                    </Typography>
                    <Typography variant="body2">
                      Estas pastas não correspondem a nenhum produto e serão ignoradas.
                    </Typography>
                  </Alert>
                )}

                {/* Details Table */}
                {mappingData?.details && mappingData.details.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                      Detalhes da associação:
                    </Typography>
                    <TableContainer 
                      component={Paper} 
                      variant="outlined"
                      sx={{ 
                        maxHeight: 480,
                        overflow: 'auto',
                      }}
                    >
                      <Table stickyHeader>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.75rem', bgcolor: 'grey.50' }}>
                              Código
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.75rem', bgcolor: 'grey.50' }}>
                              Produto
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.75rem', bgcolor: 'grey.50' }}>
                              Imagens
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.75rem', bgcolor: 'grey.50' }}>
                              Status
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {mappingData.details.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell sx={{ fontFamily: 'monospace' }}>
                                {item.codigo_interno}
                              </TableCell>
                              <TableCell sx={{ 
                                maxWidth: 300, 
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}>
                                {item.productName}
                              </TableCell>
                              <TableCell>{item.imageCount}</TableCell>
                              <TableCell>
                                {item.imageCount > 0 ? (
                                  <Chip
                                    icon={<CheckCircle sx={{ fontSize: 16 }} />}
                                    label="OK"
                                    size="small"
                                    color="success"
                                    variant="outlined"
                                  />
                                ) : (
                                  <Chip
                                    icon={<CloseIcon sx={{ fontSize: 16 }} />}
                                    label="Sem imagens"
                                    size="small"
                                    color="warning"
                                    variant="outlined"
                                  />
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                )}

                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleDirectorySelect}
                  startIcon={<FolderOpen />}
                >
                  Selecionar outro diretório
                </Button>
              </Box>
            )}

            {error && (
              <Alert 
                severity="error"
                icon={<AlertCircleIcon />}
                sx={{ mt: 2 }}
              >
                <Typography variant="body2" fontWeight="bold">
                  Erro
                </Typography>
                <Typography variant="body2">
                  {error}
                </Typography>
              </Alert>
            )}

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
                color="info"
                onClick={nextStep}
                disabled={!hasImages}
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
