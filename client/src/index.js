import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

//Contexts
import { UserContext } from './store/UserContext';
import { CartProvider } from './store/CartContext';
import { CartQtyProvider } from './store/CartQtyContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <CartQtyProvider>
          <UserContext>
            <App />
          </UserContext>
        </CartQtyProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
