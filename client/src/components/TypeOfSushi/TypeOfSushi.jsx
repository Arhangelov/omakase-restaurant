import { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useCart } from '../../store/CartContext';
import { Context } from '../../store/UserContext';
import { useCartQty } from '../../store/CartQtyContext';

import { getSushiType } from '../../services/menuService';
import { updateCartService } from '../../services/cartService';

import './TypeOfSushi.css';
import Menu from '../Menu/Menu';

const TypeOfSushi = () => {
  const { type } = useParams();
  const [sushi, setSushi] = useState([]);
  const [cart, setCart] = useCart();
  // eslint-disable-next-line no-unused-vars
  const [cartQty, setCartQty] = useCartQty();
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useContext(Context);

  useEffect(() => {
    getSushiType(type)
      .then((res) => setSushi(res))
      .catch((error) => console.log(error.message));
  }, [type]);

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
    <div>
      <Menu type={type}/>
      <div className="bg-type-of-sushi">
        <div className="bg-overlay"></div>
        <div className="container-wrapper">
          <div className="container">
            {sushi.map((singleSushi) => (
              <div className="sushi-product-container" key={singleSushi._id}>
                {/* Goes to a specific details page when click on the card */}
                <Link to={`/menu/details/${singleSushi._id}`}>
                  <img
                    className="productImg"
                    src={singleSushi.imageUrl}
                    alt="Sushi Product"
                    />
                  <p>{singleSushi.title}</p>
                  <p>{singleSushi.portion}</p>
                </Link>
                <div className="price-and-buy-container">
                  <p>${(singleSushi.price).toFixed(2)}</p>
                  {user.email ? (
                    <button
                      onClick={() =>
                        addToCartHandler(
                          singleSushi._id,
                          singleSushi.title,
                          singleSushi.imageUrl,
                          singleSushi.price
                          )
                        }
                        >
                      +
                    </button>
                  ):(
                    <Link to={"/login"}>+</Link>
                  ) }
                </div>
              </div>
            ))}
          </div>
        </div>
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
};

export default TypeOfSushi;
