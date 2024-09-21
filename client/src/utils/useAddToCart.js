import { useCallback, useContext } from 'react';
import { useCart } from '../store/CartContext';
import { Context } from '../store/UserContext';
import { updateCartService } from '../services/cartService';
import { useCartQty } from '../store/CartQtyContext';
import { toastSuccessHandler } from './toastSuccessHandling';

const useAddToCart = () => {
    const [cart, setCart] = useCart()
    const [ , setCartQty] = useCartQty();
    const [user,] = useContext(Context);

    const addToCartHandler = useCallback(
        (id, title, img, price) => {
            const sushiProduct = { id, title, img, price, qty: 1 };
            const currentCartItem = cart.find((item) => item.id === id);

            if (currentCartItem) {
                const index = cart.indexOf(currentCartItem);
                cart[index].qty += 1;

                setCart([...cart]);

                // Notification
                toastSuccessHandler('🍣 Product is added to the cart!');

                return updateCartService(cart[index], user.email)
                .then(cart => setCartQty(cart.sumQty));
            }

            setCart([...cart, sushiProduct]);

            // Notification
            toastSuccessHandler('🍣 Product is added to the cart!');

            return updateCartService(sushiProduct, user.email)
                .then(cart => setCartQty(cart.sumQty));
        },
        [cart, setCart, setCartQty, user.email]
    );

    return { addToCartHandler };
};

export default useAddToCart;