import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

const initialState = [];

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(initialState);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);