import React, { useState, useEffect, useRef } from 'react';
import { Rocket, Loader, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
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
          server: wizardData.server,
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
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center mb-6">
          <Rocket className="w-8 h-8 text-blue-500 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Implantação da Loja</h2>
        </div>
        
        {deploymentStatus === 'idle' && (
          <div>
            <p className="text-gray-600 mb-6">
              Tudo pronto para iniciar a implantação! Clique no botão abaixo para começar
              o processo de deploy da sua loja.
            </p>

            <div className="mb-6 p-6 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-4">Resumo da configuração:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Servidor:</p>
                  <p className="font-medium text-gray-900">{wizardData.server.ip}</p>
                </div>
                <div>
                  <p className="text-gray-500">Domínio:</p>
                  <p className="font-medium text-gray-900">{wizardData.server.domain}</p>
                </div>
                <div>
                  <p className="text-gray-500">Nome da Loja:</p>
                  <p className="font-medium text-gray-900">{wizardData.identity.name}</p>
                </div>
                <div>
                  <p className="text-gray-500">Escola de Design:</p>
                  <p className="font-medium text-gray-900">{wizardData.design.school}</p>
                </div>
                <div>
                  <p className="text-gray-500">Produtos:</p>
                  <p className="font-medium text-gray-900">{wizardData.products.csvData.length} produtos</p>
                </div>
                <div>
                  <p className="text-gray-500">Gateway de Pagamento:</p>
                  <p className="font-medium text-gray-900">
                    Mercado Pago ({wizardData.payment?.testMode ? 'Teste' : 'Produção'})
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleDeploy}
                className="px-8 py-4 bg-blue-500 text-white rounded-lg font-bold text-lg hover:bg-blue-600 inline-flex items-center shadow-lg hover:shadow-xl transition-all"
              >
                <Rocket className="w-6 h-6 mr-3" />
                Iniciar Implantação
              </button>
            </div>
          </div>
        )}

        {(deploymentStatus === 'deploying' || deploymentStatus === 'success' || deploymentStatus === 'error') && (
          <div>
            {deploymentStatus === 'deploying' && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center">
                <Loader className="w-5 h-5 text-blue-500 mr-3 animate-spin" />
                <div>
                  <p className="text-sm text-blue-800 font-medium">Implantando sua loja...</p>
                  <p className="text-sm text-blue-600">Este processo pode levar alguns minutos.</p>
                </div>
              </div>
            )}

            {deploymentStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <div>
                  <p className="text-sm text-green-800 font-medium">Implantação concluída com sucesso!</p>
                  <p className="text-sm text-green-600">Sua loja está online e pronta para uso.</p>
                </div>
              </div>
            )}

            {deploymentStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <XCircle className="w-5 h-5 text-red-500 mr-3" />
                <div>
                  <p className="text-sm text-red-800 font-medium">Erro na implantação</p>
                  <p className="text-sm text-red-600">Verifique os logs abaixo para mais detalhes.</p>
                </div>
              </div>
            )}

            {/* Terminal/Logs */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Logs de Implantação:</h3>
              <div className="bg-gray-900 rounded-lg p-4 h-96 overflow-y-auto font-mono text-sm">
                {logs.map((log, index) => (
                  <div key={index} className="mb-2 text-gray-100">
                    <span className="text-gray-500">
                      [{new Date(log.timestamp).toLocaleTimeString()}]
                    </span>{' '}
                    <span className="whitespace-pre-wrap">{log.message}</span>
                  </div>
                ))}
                <div ref={logsEndRef} />
              </div>
            </div>

            {deploymentStatus === 'error' && (
              <div className="text-center">
                <button
                  onClick={handleDeploy}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 inline-flex items-center"
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Tentar Novamente
                </button>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 flex justify-between">
          {canStart && (
            <button
              onClick={prevStep}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 flex items-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
