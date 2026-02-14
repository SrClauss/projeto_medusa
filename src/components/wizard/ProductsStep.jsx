import React, { useState } from 'react';
import { Package, ArrowRight, ArrowLeft, Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center mb-6">
          <Package className="w-8 h-8 text-orange-500 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Produtos da Loja</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          Importe seus produtos através de um arquivo CSV. O arquivo deve conter os seguintes campos:
        </p>

        <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-3">Campos obrigatórios:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-mono font-bold text-orange-600">nome</span>
              <p className="text-gray-600">Nome do produto</p>
            </div>
            <div>
              <span className="font-mono font-bold text-orange-600">preco</span>
              <p className="text-gray-600">Preço (número decimal)</p>
            </div>
            <div>
              <span className="font-mono font-bold text-orange-600">descricao</span>
              <p className="text-gray-600">Descrição do produto</p>
            </div>
          </div>
          
          <h3 className="font-medium text-gray-900 mb-3 mt-4">Campos opcionais:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-mono font-bold text-gray-600">uuid</span>
              <p className="text-gray-600">ID único (gerado automaticamente se vazio)</p>
            </div>
            <div>
              <span className="font-mono font-bold text-gray-600">codigo_interno</span>
              <p className="text-gray-600">Código para associar imagens (sequencial se vazio)</p>
            </div>
          </div>
        </div>

        {!canContinue ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-6">Nenhum arquivo selecionado</p>
            <button
              onClick={handleFileSelect}
              disabled={loading}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed inline-flex items-center"
            >
              <Upload className="w-5 h-5 mr-2" />
              {loading ? 'Processando...' : 'Selecionar Arquivo CSV'}
            </button>
          </div>
        ) : (
          <div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start mb-6">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-green-800 font-medium">
                  {wizardData.products.csvData.length} produto(s) carregado(s) com sucesso!
                </p>
                <p className="text-sm text-green-600 mt-1">
                  Arquivo: {wizardData.products.csvFile?.split('/').pop() || 'arquivo.csv'}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Prévia (primeiros 5 produtos):</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Código</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preço</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descrição</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {preview.map((product, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm font-mono text-gray-900">{product.codigo_interno}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{product.nome}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          R$ {product.preco.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                          {product.descricao}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {wizardData.products.csvData.length > 5 && (
                <p className="text-sm text-gray-500 mt-2">
                  ... e mais {wizardData.products.csvData.length - 5} produto(s)
                </p>
              )}
            </div>

            <button
              onClick={handleFileSelect}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 inline-flex items-center text-sm"
            >
              <Upload className="w-4 h-4 mr-2" />
              Selecionar outro arquivo
            </button>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-red-800 font-medium">Erro</p>
              <p className="text-sm text-red-600 mt-1">{error}</p>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <button
            onClick={prevStep}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </button>
          <button
            onClick={nextStep}
            disabled={!canContinue}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
          >
            Continuar
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};
