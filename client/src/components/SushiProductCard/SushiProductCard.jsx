import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../store/UserContext';
import "./SushiProductCard.css"
import useAddToCart from '../../utils/useAddToCart';

export const SushiProductCard = ({ singleSushi, isBestSeller }) => {
    const [user, ] = useContext(Context);
    const { addToCartHandler } = useAddToCart();

    return (
        <div className="sushi-product-container" 
            key={singleSushi._id}
            style={{border: `2px solid ${isBestSeller ? "#7c001d" : "rgba(252, 250, 250, 0.13)"}`}}
            >
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
                    <Link
                        style={{border: `1px solid ${isBestSeller ? "#7c001d":"rgba(252, 250, 242, 0.753)"}`}}
                        to={"/login"}
                        >
                        +
                    </Link>
                ) }
            </div>
        </div>
    )
}
