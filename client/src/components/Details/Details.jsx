import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductDetails } from '../../services/menuService';
import { Context } from '../../store/UserContext';
import { useCart } from '../../store/CartContext';
import { useCartQty } from '../../store/CartQtyContext';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Details.css';
import { updateCartService } from '../../services/cartService';

const Details = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [user] = useContext(Context);
    const [cart, setCart] = useCart();
    const [cartQty, setCartQty] = useCartQty();

    
    useEffect(() => {
        getProductDetails(productId)
            .then((res) => setProduct(res))
            .catch((error) => console.log(error.message));
    }, [productId, setProduct]);

    const addToCartHandler = useCallback(
        (id, title, img, price) => {
            const sushiProduct = { id, title, img, price, qty: 1 };
            const currentCartItem = cart.find((item) => item.id === id);
    
            if (currentCartItem) {
                const index = cart.indexOf(currentCartItem);
                cart[index].qty += 1;
    
            setCart([...cart]);
    
            // Notification on successfully added product to cart
            toast.success('🍣 Product is added to the cart!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return updateCartService(cart[index], user.email)
                    .then(cart => setCartQty(cart.sumQty));
            }
    
            setCart([ ...cart, sushiProduct ]);
    
          // Notification on successfully added product to cart
            toast.success('🍣 Product is added to the cart!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return updateCartService(sushiProduct, user.email)
                .then(cart => setCartQty(cart.sumQty));
    
        },
        [cart, setCart, setCartQty, user.email]
        );

    return (
        <div className='details-page'>
            <div className="container-details">
                <span className='img-container-details'>
                    <img className='product-img-details' src={product.imageUrl} alt={product.title} />
                </span>

                <span className='content-container'>
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                    
                    <h3>$ {product.price?.toFixed(2)}</h3>
                    {user.email ? (
                        <button onClick={() => addToCartHandler(
                            product._id,
                            product.title,
                            product.imageUrl,
                            product.price
                        )} className='btn-details'>Add to cart</button>
                    ) : (
                        <Link className='btn-details' to={"/login"}>Login</Link>
                    )}
                </span>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
}

export default Details