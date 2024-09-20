import { useCallback, useContext } from 'react';
import { useCart } from '../store/CartContext';
import { Context } from '../store/UserContext';
import { updateCartService } from '../services/cartService';
import { toast } from 'react-toastify';
import { useCartQty } from '../store/CartQtyContext';

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
                toast.success('🍣 Product is added to the cart!', {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark',
                });
            return updateCartService(cart[index], user.email)
                .then(cart => setCartQty(cart.sumQty));
            }

            setCart([...cart, sushiProduct]);

            // Notification
            toast.success('🍣 Product is added to the cart!', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
            });
            return updateCartService(sushiProduct, user.email)
                .then(cart => setCartQty(cart.sumQty));
        },
        [cart, setCart, setCartQty, user.email]
    );

    return { addToCartHandler };
};

export default useAddToCart;