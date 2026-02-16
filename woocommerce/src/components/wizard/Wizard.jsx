import { useState } from 'react';
import { WizardProvider } from '../../contexts/WizardContext';

export default function Wizard() {
  return (
    <WizardProvider>
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              WooCommerce Setup Wizard
            </h2>
            <p className="text-gray-600 mb-8">
              Follow the steps to deploy your WordPress + WooCommerce store
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    This wizard will help you deploy a complete WordPress + WooCommerce store with automatic configuration.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">✨ What's Included:</h3>
                <ul className="text-left text-gray-600 space-y-2">
                  <li>• WordPress 6.x + WooCommerce 9.x</li>
                  <li>• MySQL 8.x database</li>
                  <li>• Nginx web server with SSL</li>
                  <li>• Popular WooCommerce themes</li>
                  <li>• Payment gateway integration (Mercado Pago, PayPal, Stripe)</li>
                  <li>• Essential plugins (Cache, SEO, Security)</li>
                  <li>• Automated product import</li>
                  <li>• Docker-based deployment</li>
                </ul>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-semibold text-amber-800 mb-2">🚧 Development Status:</h3>
                <p className="text-amber-700 text-sm">
                  The WooCommerce variant is currently under development. The wizard interface 
                  and deployment logic are being implemented. Stay tuned for updates!
                </p>
              </div>

              <div className="mt-8">
                <button 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                  disabled
                >
                  Start Setup (Coming Soon)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WizardProvider>
  );
}
