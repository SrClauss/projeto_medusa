import React, { useState } from 'react';
import { Image as ImageIcon, ArrowRight, ArrowLeft, FolderOpen, CheckCircle, AlertCircle, X } from 'lucide-react';
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
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center mb-6">
          <ImageIcon className="w-8 h-8 text-cyan-500 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Imagens dos Produtos</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          Selecione o diretório raiz contendo as imagens dos produtos. Cada subpasta deve ter o nome
          igual ao <strong>codigo_interno</strong> do produto e conter as imagens correspondentes.
        </p>

        <div className="mb-6 p-4 bg-cyan-50 border border-cyan-200 rounded-lg">
          <h3 className="font-medium text-cyan-900 mb-2">Estrutura esperada:</h3>
          <pre className="text-sm text-cyan-800 font-mono bg-white p-3 rounded border border-cyan-300 overflow-x-auto">
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
          </pre>
          <p className="text-sm text-cyan-700 mt-2">
            Os nomes das subpastas (1, 2, 3) devem corresponder ao <strong>codigo_interno</strong> dos produtos.
          </p>
        </div>

        {!hasImages ? (
          <div className="text-center py-12">
            <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-6">Nenhum diretório selecionado</p>
            <button
              onClick={handleDirectorySelect}
              disabled={loading}
              className="px-6 py-3 bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-600 disabled:bg-gray-300 disabled:cursor-not-allowed inline-flex items-center"
            >
              <FolderOpen className="w-5 h-5 mr-2" />
              {loading ? 'Escaneando...' : 'Selecionar Diretório'}
            </button>
          </div>
        ) : (
          <div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start mb-6">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-green-800 font-medium">
                  Diretório escaneado com sucesso!
                </p>
                <p className="text-sm text-green-600 mt-1">
                  {wizardData.images.directory}
                </p>
              </div>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-2xl font-bold text-blue-900">
                  {mappingData?.productsWithImages || 0}
                </p>
                <p className="text-sm text-blue-700">Produtos com imagens</p>
              </div>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-2xl font-bold text-yellow-900">
                  {mappingData?.productsWithoutImages || 0}
                </p>
                <p className="text-sm text-yellow-700">Produtos sem imagens</p>
              </div>
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-2xl font-bold text-purple-900">
                  {mappingData?.totalImages || 0}
                </p>
                <p className="text-sm text-purple-700">Total de imagens</p>
              </div>
            </div>

            {/* Warnings */}
            {mappingData?.productsWithoutImages > 0 && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-yellow-800 font-medium">
                      {mappingData.productsWithoutImages} produto(s) sem imagens
                    </p>
                    <p className="text-sm text-yellow-700 mt-1">
                      Estes produtos serão criados sem imagens. Você pode adicionar imagens depois.
                    </p>
                    {mappingData.missingFolders && mappingData.missingFolders.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-yellow-700 font-medium">Pastas não encontradas:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {mappingData.missingFolders.slice(0, 10).map((folder, i) => (
                            <span key={i} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-mono">
                              {folder}
                            </span>
                          ))}
                          {mappingData.missingFolders.length > 10 && (
                            <span className="px-2 py-1 text-yellow-700 text-xs">
                              +{mappingData.missingFolders.length - 10} mais
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {mappingData?.orphanFolders && mappingData.orphanFolders.length > 0 && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-800 font-medium">
                      {mappingData.orphanFolders.length} pasta(s) órfã(s) encontrada(s)
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      Estas pastas não correspondem a nenhum produto e serão ignoradas.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Details Table */}
            {mappingData?.details && mappingData.details.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Detalhes da associação:</h3>
                <div className="overflow-x-auto max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Código</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produto</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Imagens</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mappingData.details.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 text-sm font-mono text-gray-900">
                            {item.codigo_interno}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate">
                            {item.productName}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {item.imageCount}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {item.imageCount > 0 ? (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                OK
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                <X className="w-3 h-3 mr-1" />
                                Sem imagens
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <button
              onClick={handleDirectorySelect}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 inline-flex items-center text-sm"
            >
              <FolderOpen className="w-4 h-4 mr-2" />
              Selecionar outro diretório
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
            disabled={!hasImages}
            className="px-6 py-3 bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
          >
            Continuar
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};
