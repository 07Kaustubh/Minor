import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './services/CartContext.jsx';
import { AuthProvider } from './services/auth.jsx'; // Import AuthProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </Router>
);
