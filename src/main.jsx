import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { StoreProvider } from './context/StoreContext';
import { DataStoreProvider } from './context/DataStoreContext';
import { ClinicProvider } from './context/ClinicContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <DataStoreProvider>
            <ClinicProvider>
              <CartProvider>
                <StoreProvider>
                  <App />
                </StoreProvider>
              </CartProvider>
            </ClinicProvider>
          </DataStoreProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
