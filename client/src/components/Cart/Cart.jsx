import { useCallback, useContext, useEffect, useRef, useState } from 'react';
//Contexts
import { useCart } from '../../store/CartContext';
import { useCartQty } from '../../store/CartQtyContext';
import { Context } from '../../store/UserContext';
//Services
import { updateCartService, deleteFromCartService, getCartService } from '../../services/cartService';
//Styles
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

import SusiSahimi from "../../resources/sushi-sashimi-parallax.jpg"
import { toastErrorHandler } from '../../utils/toastErrorHandling';

const Cart = () => {
  const [cart, setCart] = useCart();
  // eslint-disable-next-line no-unused-vars
  const [cartQty, setCartQty] = useCartQty();
  const [totalPrice, setTotalPrice] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useContext(Context);
  const navigate = useNavigate();

useEffect(() => {
  if(!user.email){
    navigate("/");
    toastErrorHandler("You have to be logged in to enter in cart.");
  } else {
    getCartService(user.email)
    .then((cart) => {
      setCart(cart.products);
      setTotalPrice(cart.totalPrice);
      setCartQty(cart.sumQty);
    })
  }
},[])

  //Decrement product quantity in the cart
  const handleDecrementProduct = useCallback(
    (productId) => {
      const currentCartItem = cart.find((item) => item.id === productId);

      const index = cart.indexOf(currentCartItem);
      cart[index].qty -= 1;

      if (cart[index].qty === 0) {
        const filteredCart = cart.filter((sushi) => sushi.id !== productId);

        deleteFromCartService(cart[index].id, user.email)
          .then(cart => {
            setTotalPrice(cart.totalPrice);
            setCartQty(cart.sumQty);
          })
        return setCart(filteredCart);
      }

      setCart([...cart]);

      if(cart[index].qty !== 0) {
        return updateCartService(cart[index], user.email)
                .then(cart => {
                  setTotalPrice(cart.totalPrice);
                  setCartQty(cart.sumQty);
                })
      }
    },
    [cart, setCart, user.email, setCartQty]
  );

    //Increment product quantity in the cart
  const handleIncrementProduct = useCallback(
    (productId) => {
      const currentCartItem = cart.find((item) => item.id === productId);
      const index = cart.indexOf(currentCartItem);
      cart[index].qty += 1;

      setCart([...cart]);
      return updateCartService(cart[index], user.email)
        .then(cart => {
          setTotalPrice(cart.totalPrice);
          setCartQty(cart.sumQty);
        })
    },
    [cart, setCart, user.email, setCartQty]
  );

  const onFinishOrder = useCallback(() => {
    navigate("/finished-order");
  },[navigate]); 

  let ref = useRef(null);
  let { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start start", "end start"],
  });
  let y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  let opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="cart-page-container">
      <h1>Cart</h1>
      <motion.div className="cart-img" style={{ y, opacity }}>
        <img src={SusiSahimi} alt="about-heading"/>
      </motion.div>
      <div className="cart-wrapper">
        <section className="container-cart">
            <div className="cart-columns">
              {cart?.map((sushi) => (
                <div className="cart-row" key={sushi.id}>
                    <div className="cart-container-img">
                      {' '}
                      <img
                        className="cart-product-img"
                        src={sushi.img}
                        alt="product"
                      />{' '}
                    </div>
                    <p> {sushi.title} </p>
                    <div className='cart-buttons'>
                      <button onClick={() => handleDecrementProduct(sushi.id)}>
                        -
                      </button>
                      <p>{sushi.qty}</p>
                      <button onClick={() => handleIncrementProduct(sushi.id)}>
                        +
                      </button>
                    </div>
                    <p> ${(sushi.qty * sushi.price).toFixed(2)}</p>
                </div>
              ))}
            </div>
            {cart === undefined || cart.length !== 0 ? (
              <div className='final-price-container'>
                <div className="sub-total">
                  <div>
                    <p> Sub-total</p>
                    <p>{cartQty} items</p>
                  </div>
                  <div>
                    <p>${ totalPrice.toFixed(2) }</p>
                  </div>
                </div>
                <div className="delivery">
                  <div>
                    <p>Delivery tax</p>
                  </div>
                  <div>
                    <p>${ Number(3.00).toFixed(2) }</p>
                  </div>
                </div>
                <h3>Total{" "}${ (totalPrice + 3.00).toFixed(2) }</h3>
                <button onClick={onFinishOrder}>Finish Order</button>
              </div>
            ): (
              <h3>The cart is empty</h3>
            )}
        </section>
      </div>
    </div>
  );
};

export default Cart;
