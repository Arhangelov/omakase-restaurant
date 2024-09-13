import { createContext, useContext, useState } from 'react';

const CartQtyContext = createContext();

const initialState = 0;

export const CartQtyProvider = ({ children }) => {
    const [cartQty, setCartQty] = useState(initialState);

    return (
        <CartQtyContext.Provider value={[cartQty, setCartQty]}>
            {children}
        </CartQtyContext.Provider>
    );
};

export const useCartQty = () => useContext(CartQtyContext);