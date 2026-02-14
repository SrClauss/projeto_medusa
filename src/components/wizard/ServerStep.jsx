import React, { useState } from 'react';
import { Server, CheckCircle, XCircle, Loader } from 'lucide-react';
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
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center mb-6">
          <Server className="w-8 h-8 text-blue-500 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Configuração do Servidor</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          Informe os dados do seu servidor Linux. A conexão SSH será estabelecida automaticamente
          usando sua chave pública padrão (~/.ssh/id_rsa.pub).
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Endereço IP do Servidor
            </label>
            <input
              type="text"
              placeholder="192.168.1.100"
              value={wizardData.server.ip}
              onChange={(e) => updateWizardData('server', { ip: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Domínio da Loja
            </label>
            <input
              type="text"
              placeholder="minha-loja.com"
              value={wizardData.server.domain}
              onChange={(e) => updateWizardData('server', { domain: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <XCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-red-800 font-medium">Erro ao conectar</p>
              <p className="text-sm text-red-600 mt-1">{error}</p>
            </div>
          </div>
        )}

        {wizardData.server.connected && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            <p className="text-sm text-green-800 font-medium">Conectado com sucesso!</p>
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleConnect}
            disabled={!wizardData.server.ip || !wizardData.server.domain || loading}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Conectando...
              </>
            ) : (
              'Conectar e Continuar'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
