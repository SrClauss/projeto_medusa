import React from 'react';
import { CheckCircle, ExternalLink, Copy, RefreshCw } from 'lucide-react';
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            🎉 Loja Implantada com Sucesso!
          </h2>
          <p className="text-lg text-gray-600">
            Sua loja <strong>{wizardData.identity.name}</strong> está online e pronta para vendas!
          </p>
        </div>

        {/* Store Information */}
        <div className="space-y-6 mb-8">
          {/* Store URL */}
          <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">🌐 URL da Loja (Frontend)</h3>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={storeUrl}
                readOnly
                className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg font-mono text-sm"
              />
              <button
                onClick={handleOpenStore}
                className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center whitespace-nowrap"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Abrir
              </button>
              <button
                onClick={() => handleCopyToClipboard(storeUrl, 'URL da loja')}
                className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                title="Copiar URL"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Admin URL */}
          <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">🔐 Painel Administrativo (Backend)</h3>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={adminUrl}
                readOnly
                className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg font-mono text-sm"
              />
              <button
                onClick={handleOpenAdmin}
                className="px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center whitespace-nowrap"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Abrir
              </button>
              <button
                onClick={() => handleCopyToClipboard(adminUrl, 'URL do admin')}
                className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                title="Copiar URL"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-purple-700 mt-2">
              <strong>Credenciais padrão:</strong> admin@medusa-test.com / supersecret
              <br />
              ⚠️ Altere a senha ao fazer o primeiro login!
            </p>
          </div>

          {/* Webhook URL */}
          <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">🔗 Webhook do Mercado Pago</h3>
            <p className="text-sm text-green-800 mb-3">
              Configure esta URL no painel do Mercado Pago para receber notificações de pagamento:
            </p>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={webhookUrl}
                readOnly
                className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg font-mono text-sm"
              />
              <button
                onClick={() => window.open('https://www.mercadopago.com.br/developers/panel/webhooks', '_blank')}
                className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center whitespace-nowrap"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Configurar
              </button>
              <button
                onClick={() => handleCopyToClipboard(webhookUrl, 'Webhook URL')}
                className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                title="Copiar URL"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-3 p-3 bg-white rounded border border-green-300">
              <p className="text-sm text-gray-700 mb-2"><strong>Eventos a configurar:</strong></p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• payment.created</li>
                <li>• payment.updated</li>
                <li>• merchant_order.updated</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-4">📊 Resumo da Implantação</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-500 mb-1">Produtos</p>
              <p className="text-2xl font-bold text-gray-900">{wizardData.products.csvData.length}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Imagens</p>
              <p className="text-2xl font-bold text-gray-900">
                {wizardData.images.mapping?.totalImages || 0}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Design</p>
              <p className="text-lg font-bold text-gray-900 capitalize">{wizardData.design.school}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Pagamento</p>
              <p className="text-lg font-bold text-gray-900">Mercado Pago</p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-3">📝 Próximos Passos</h3>
          <ol className="space-y-2 text-sm text-blue-800">
            {isLocal && (
              <li className="flex items-start">
                <span className="font-bold mr-2">•</span>
                <span><strong>Container Local:</strong> Sua loja está rodando no container "medusa-project". Use <code>docker logs medusa-project</code> para ver logs.</span>
              </li>
            )}
            <li className="flex items-start">
              <span className="font-bold mr-2">1.</span>
              <span>Acesse o painel administrativo e altere a senha padrão</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">2.</span>
              <span>Configure o webhook no painel do Mercado Pago</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">3.</span>
              <span>Verifique os produtos e ajuste as informações se necessário</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">4.</span>
              <span>Teste o processo de compra completo em modo de teste</span>
            </li>
            {!isLocal && (
              <>
                <li className="flex items-start">
                  <span className="font-bold mr-2">5.</span>
                  <span>Configure DNS do domínio para apontar para o servidor (se ainda não fez)</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">6.</span>
                  <span>Personalize os e-mails transacionais no painel administrativo</span>
                </li>
              </>
            )}
            {isLocal && (
              <li className="flex items-start">
                <span className="font-bold mr-2">5.</span>
                <span>Para parar o container: <code>docker stop medusa-project</code></span>
              </li>
            )}
          </ol>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleOpenStore}
            className="px-8 py-4 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 flex items-center shadow-lg hover:shadow-xl transition-all"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Visitar Loja
          </button>
          <button
            onClick={handleStartNew}
            className="px-8 py-4 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 flex items-center"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Nova Implantação
          </button>
        </div>
      </div>
    </div>
  );
};
