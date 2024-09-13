import { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { Context } from '../../store/UserContext'
import { useCart } from '../../store/CartContext';
import { useCartQty } from '../../store/CartQtyContext';

import { finishOrderService, getCartService } from '../../services/cartService';
import { MdArrowBackIos } from "react-icons/md";
import "./FinishedOrder.css";

const FinishedOrder = () => {
    const [user] = useContext(Context);
    const [cart, setCart] = useCart();
    const [cartQty, setCartQty] = useCartQty();
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();


    useEffect(() => {
        getCartService(user.email)
            .then((cart) => {
                setCart(cart.products);
                setTotalPrice(cart.totalPrice);
            })
        }, [user.email, setCart, setTotalPrice]);

    useEffect(() => {
        finishOrderService(user.email)
        setCartQty(0)
    }, [user.email, setCartQty])

    const onReturnHandler = useCallback(() => {
        navigate("/")
    },[navigate])

    return (
        <section className='finish-order-container'>
            <div>
                <h4> Thank You for Your Delicious Order, Mr. {user.username}! 🍣🍱🍙</h4>
                <p>Time Delivery: {Math.floor(Math.random() * (60 - 40) + 40 )} mins</p>
            </div>

            <div>
                <div className='order-details-container'>
                    <h4>Order Details:</h4>
                    <p>Order ID: {Math.floor(Math.random() * 10000)}</p>
                    <p>Delivery Address: {user.address}</p>
                </div>
                <div className='order-main-container'>
                    {cart?.map((sushi) => (
                        <div className='order-list-container' key={sushi.id}>
                        <div className='order-product-container'>
                            <div className="container-img">
                                <img
                                    className="product-img"
                                    src={sushi.img}
                                    alt="product"
                                />
                            </div>
                            <p> {sushi.title} </p>
                            <p> x{sushi.qty} </p>
                            <p> {sushi.price.toFixed(2)} BGN </p>
                        </div>
                        </div>
                    ))}
                    <div className='expenses-container'>
                        <button onClick={onReturnHandler}><MdArrowBackIos /> Return</button>
                        <div>
                            <p>Delivery Fee: {Number(3).toFixed(2)} BGN</p>
                            <p>Total Amount:</p>
                            <p> {(totalPrice + Number(3)).toFixed(2)} BGN </p>
                        </div>
                    </div>
                </div>
            </div>
            
        </section>
    )
}

export default FinishedOrder