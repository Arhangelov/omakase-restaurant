import { useCallback, useContext, useEffect, useState } from 'react'
import { getPurchaseHistoryService, rePurchaseOrderService } from '../../services/userProfileService'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./Profile.css"
import { Context } from '../../store/UserContext';
import { useCart } from '../../store/CartContext';
import { useCartQty } from '../../store/CartQtyContext';

const Profile = () => {
    const [user] = useContext(Context);
    const [cart, setCart] = useCart();
    const [cartQty, setCartQty] = useCartQty();
    const [purchaseHistory, setPurchaseHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.username) navigate("/");
    }, [navigate, user.username])

    useEffect(() => {
        getPurchaseHistoryService(user.email)
            .then(orderHistory => setPurchaseHistory(orderHistory));
    },[user.email]);

    const addToCartAgainHandler = useCallback(async (cart, totalPrice) => {
        try {
            const reOrderedCart = await rePurchaseOrderService(cart, totalPrice, user.email);

            if(reOrderedCart) {
                setCart(reOrderedCart.products);
                console.log("PROFILE setCart");
                setCartQty(reOrderedCart.sumQty);
                navigate("/cart");
            }
        } catch (error){
            console.error(error);
            toast.error('Something went wrong!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }

    
    },[user.email, navigate, setCart, setCartQty])


    return (
        <>
            <div className="profile-container">
                <h1>{user.username} Profile Page</h1>
                <p>Order Again You'r Last Meal 🍣</p>
                <div className="order-again-wrapper">
                    <div className='order-again-container'>
                        {purchaseHistory.map(order =>
                        <div className='order-card' key={order.id}>
                            <p>Date: {order.currDate}</p>
                            <div className='ordered-products'>
                                {order.cart.map(sushi =>
                                <p>{sushi.qty}x {sushi.title}</p>
                                )}
                            </div>
                            <p>${order.totalPrice.toFixed(2)}</p>
                            <button onClick={() => addToCartAgainHandler(order.cart, order.totalPrice)}>Order Again</button>
                        </div>
                        )}
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
                theme="colored"
            />
        </>
    )
}

export default Profile