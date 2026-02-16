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
  CircularProgress,
} from '@mui/material';
import {
  Inventory as PackageIcon,
  ArrowForward,
  ArrowBack,
  Upload,
  Description as FileTextIcon,
  CheckCircle,
  Error as AlertCircleIcon,
} from '@mui/icons-material';
import { open } from '@tauri-apps/plugin-dialog';
import { invoke } from '@tauri-apps/api/core';
import { useWizard } from '../../contexts/WizardContext';
import Papa from 'papaparse';

export const ProductsStep = () => {
  const { wizardData, updateWizardData, nextStep, prevStep } = useWizard();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState([]);

  const handleFileSelect = async () => {
    try {
      const selected = await open({
        multiple: false,
        filters: [{
          name: 'CSV',
          extensions: ['csv']
        }]
      });

      if (selected) {
        setLoading(true);
        setError(null);
        
        // Read and parse CSV file
        const result = await invoke('read_csv_file', { path: selected });
        
        Papa.parse(result, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            // Validate required columns
            const requiredColumns = ['nome', 'preco', 'descricao'];
            const headers = results.meta.fields || [];
            const missingColumns = requiredColumns.filter(col => !headers.includes(col));
            
            if (missingColumns.length > 0) {
              setError(`Colunas obrigatórias faltando: ${missingColumns.join(', ')}`);
              setLoading(false);
              return;
            }
            
            // Process data
            const products = results.data.map((row, index) => ({
              uuid: row.uuid || `product-${Date.now()}-${index}`,
              codigo_interno: row.codigo_interno || `${index + 1}`,
              nome: row.nome,
              preco: parseFloat(row.preco) || 0,
              descricao: row.descricao,
            }));
            
            updateWizardData('products', {
              csvData: products,
              csvFile: selected,
            });
            
            setPreview(products.slice(0, 5));
            setLoading(false);
          },
          error: (err) => {
            setError(`Erro ao processar CSV: ${err.message}`);
            setLoading(false);
          }
        });
      }
    } catch (err) {
      setError(`Erro ao selecionar arquivo: ${err.toString()}`);
      setLoading(false);
    }
  };

  const canContinue = wizardData.products.csvData && wizardData.products.csvData.length > 0;

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', py: 4 }}>
      <Card elevation={2}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <PackageIcon sx={{ fontSize: 40, color: 'warning.main' }} />
              <Typography variant="h4" component="h2" fontWeight="bold">
                Produtos da Loja
              </Typography>
            </Box>
            
            <Typography variant="body1" color="text.secondary">
              Importe seus produtos através de um arquivo CSV. O arquivo deve conter os seguintes campos:
            </Typography>

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
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Campos obrigatórios:
              </Typography>
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" fontFamily="monospace" fontWeight="bold" color="warning.dark">
                    nome
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Nome do produto
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" fontFamily="monospace" fontWeight="bold" color="warning.dark">
                    preco
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Preço (número decimal)
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" fontFamily="monospace" fontWeight="bold" color="warning.dark">
                    descricao
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Descrição do produto
                  </Typography>
                </Grid>
              </Grid>
              
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Campos opcionais:
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" fontFamily="monospace" fontWeight="bold" color="text.secondary">
                    uuid
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ID único (gerado automaticamente se vazio)
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" fontFamily="monospace" fontWeight="bold" color="text.secondary">
                    codigo_interno
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Código para associar imagens (sequencial se vazio)
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            {!canContinue ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <FileTextIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Nenhum arquivo selecionado
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  color="warning"
                  onClick={handleFileSelect}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Upload />}
                >
                  {loading ? 'Processando...' : 'Selecionar Arquivo CSV'}
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
                    {wizardData.products.csvData.length} produto(s) carregado(s) com sucesso!
                  </Typography>
                  <Typography variant="body2">
                    Arquivo: {wizardData.products.csvFile?.split('/').pop() || 'arquivo.csv'}
                  </Typography>
                </Alert>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                    Prévia (primeiros 5 produtos):
                  </Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table>
                      <TableHead>
                        <TableRow sx={{ bgcolor: 'grey.50' }}>
                          <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                            Código
                          </TableCell>
                          <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                            Nome
                          </TableCell>
                          <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                            Preço
                          </TableCell>
                          <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                            Descrição
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {preview.map((product, index) => (
                          <TableRow key={index}>
                            <TableCell sx={{ fontFamily: 'monospace' }}>
                              {product.codigo_interno}
                            </TableCell>
                            <TableCell>{product.nome}</TableCell>
                            <TableCell>R$ {product.preco.toFixed(2)}</TableCell>
                            <TableCell sx={{ 
                              maxWidth: 300, 
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}>
                              {product.descricao}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {wizardData.products.csvData.length > 5 && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      ... e mais {wizardData.products.csvData.length - 5} produto(s)
                    </Typography>
                  )}
                </Box>

                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleFileSelect}
                  startIcon={<Upload />}
                >
                  Selecionar outro arquivo
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
                color="warning"
                onClick={nextStep}
                disabled={!canContinue}
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
