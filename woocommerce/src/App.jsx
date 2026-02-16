import { useState } from 'react';
import Wizard from './components/wizard/Wizard';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🛍️ WooCommerce Deployment Wizard
          </h1>
          <p className="text-gray-300">
            Deploy your WordPress + WooCommerce store in minutes
          </p>
        </div>
        <Wizard />
      </div>
    </div>
  );
}

export default App;
