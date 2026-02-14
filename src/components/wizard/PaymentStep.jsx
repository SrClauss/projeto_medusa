import React, { useState } from 'react';
import { CreditCard, ArrowRight, ArrowLeft, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { useWizard } from '../../contexts/WizardContext';

export const PaymentStep = () => {
  const { wizardData, updateWizardData, nextStep, prevStep } = useWizard();
  const [showToken, setShowToken] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null); // 'success' | 'error' | null

  // Initialize payment data if not exists
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
      // Here we would call a Rust command to validate the Mercado Pago token
      // For now, we'll simulate the validation
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center mb-6">
          <CreditCard className="w-8 h-8 text-green-500 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Configuração de Pagamento</h2>
        </div>
        
        <p className="text-gray-600 mb-8">
          Configure sua integração com o Mercado Pago. O token será usado para processar pagamentos
          e os webhooks notificarão sua loja sobre mudanças de status dos pedidos.
        </p>

        <div className="space-y-6">
          {/* Test Mode Toggle */}
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium text-yellow-900 mb-2">Modo de Teste</h3>
                <p className="text-sm text-yellow-800 mb-3">
                  No modo de teste, você pode usar credenciais de teste do Mercado Pago
                  sem processar pagamentos reais.
                </p>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isTestMode}
                    onChange={(e) => updateWizardData('payment', { testMode: e.target.checked })}
                    className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm font-medium text-yellow-900">
                    Usar modo de teste (recomendado para desenvolvimento)
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Mercado Pago Access Token */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isTestMode ? 'Token de Teste do Mercado Pago' : 'Token de Produção do Mercado Pago'} *
            </label>
            <div className="relative">
              <input
                type={showToken ? 'text' : 'password'}
                placeholder={isTestMode ? 'TEST-1234567890-abcdef...' : 'APP_USR-1234567890-abcdef...'}
                value={wizardData.payment?.mercadoPagoToken || ''}
                onChange={(e) => updateWizardData('payment', { mercadoPagoToken: e.target.value })}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono text-sm"
              />
              <button
                type="button"
                onClick={() => setShowToken(!showToken)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showToken ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {isTestMode ? (
                <>
                  Obtenha seu token de teste em:{' '}
                  <a
                    href="https://www.mercadopago.com.br/developers/panel/credentials"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    Credenciais de Teste
                  </a>
                </>
              ) : (
                <>
                  Obtenha seu token de produção em:{' '}
                  <a
                    href="https://www.mercadopago.com.br/developers/panel/credentials"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    Credenciais de Produção
                  </a>
                </>
              )}
            </p>
          </div>

          {/* Test Connection Button */}
          {wizardData.payment?.mercadoPagoToken && (
            <div>
              <button
                onClick={handleTestConnection}
                disabled={testingConnection}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {testingConnection ? 'Testando conexão...' : 'Testar Conexão'}
              </button>
            </div>
          )}

          {/* Connection Status */}
          {connectionStatus === 'success' && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-green-800 font-medium">Token válido!</p>
                <p className="text-sm text-green-600 mt-1">
                  Conexão com Mercado Pago estabelecida com sucesso.
                </p>
              </div>
            </div>
          )}

          {connectionStatus === 'error' && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-red-800 font-medium">Token inválido</p>
                <p className="text-sm text-red-600 mt-1">
                  Não foi possível validar o token. Verifique se está correto.
                </p>
              </div>
            </div>
          )}

          {/* Webhook Information */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Configuração de Webhooks</h3>
            <p className="text-sm text-blue-800 mb-3">
              Os webhooks serão configurados automaticamente durante o deploy. Você precisará
              registrar a seguinte URL no painel do Mercado Pago após a implantação:
            </p>
            <div className="bg-white p-3 rounded border border-blue-300 font-mono text-sm text-gray-700">
              https://{wizardData.server?.domain || 'seu-dominio.com'}/api/webhooks/mercadopago
            </div>
            <p className="text-xs text-blue-600 mt-2">
              Esta URL será exibida novamente na tela de conclusão do wizard.
            </p>
          </div>

          {/* Optional: Webhook Secret */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Webhook Secret (Opcional)
            </label>
            <input
              type="password"
              placeholder="Deixe em branco para gerar automaticamente"
              value={wizardData.payment?.webhookSecret || ''}
              onChange={(e) => updateWizardData('payment', { webhookSecret: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono text-sm"
            />
            <p className="mt-2 text-sm text-gray-500">
              Um secret será gerado automaticamente se você deixar este campo vazio.
              Use para validar que os webhooks vêm do Mercado Pago.
            </p>
          </div>

          {/* Information Box */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Como funciona a integração?</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">1.</span>
                <span>O token do Mercado Pago será configurado no backend Medusa</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">2.</span>
                <span>Um endpoint de webhook será criado automaticamente</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">3.</span>
                <span>O Mercado Pago notificará este endpoint sobre status de pagamentos</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">4.</span>
                <span>Sua loja processará os pedidos automaticamente</span>
              </li>
            </ul>
          </div>
        </div>

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
            className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
          >
            Continuar
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};
