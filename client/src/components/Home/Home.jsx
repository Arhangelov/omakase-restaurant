import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

import { RiArrowRightSLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MyVideo from "../../resources/dish-vid.mp4";
import SushiChef from "../../resources/sushi-chef.jpg";
import JosephGonzalez from "../../resources/joseph-gonzalez.jpg";
import ChristopherCampbell from "../../resources/christopher-campbell.jpg";
import JuricaKoletic from "../../resources/jurica-koletic.jpg";
import LuisVillasmil from "../../resources/luis-villasmil.jpg";
import SushiBar from "../../resources/pexels-airam-datoon.jpg";

import "./Home.css"
import { getPopularSushi } from '../../services/homeService';
import { updateCartService } from '../../services/cartService';
import { useCart } from '../../store/CartContext';
import { Context } from '../../store/UserContext';
import { motion, useTransform, useScroll } from "framer-motion";

const Home = () => {
    const [popProducts, setPopProducts] = useState([])
    const [cart, setCart] = useCart()
    const [user,] = useContext(Context);

    let ref = useRef(null);
    let { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    let y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    let opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    
    useEffect(() => {
        const popularProducts = [
            '60c36883931396db2e58a828',
            '60c3698e931396db2e58a82a',
            '60c23dd1a027770a5d5f26e0'
        ];

        getPopularSushi({...popularProducts})
            .then((products) => setPopProducts(Object.values(products))) //Cant push products to a array in useState and later to be map
            .catch((error) => console.log(error.message));
    }, [])

    const addToCartHandler = useCallback(
        (id, title, img, price) => {
            const sushiProduct = { id, title, img, price, qty: 1 };
            const currentCartItem = cart.find((item) => item.id === id);
    
            if (currentCartItem) {
                const index = cart.indexOf(currentCartItem);
                cart[index].qty += 1;
    
                setCart(cart);
                
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
                return updateCartService(cart[index], user.email);
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
            return updateCartService(sushiProduct, user.email);
        },[cart, setCart, user.email]);

    return (
        <div className="home-page" >
            <motion.div className='sushi-video' 
                style={{ y, opacity}}>
                <video width="100%" height="900" playsInline autoPlay muted loop>
                    <source src={MyVideo} type="video/mp4" />
                    <source src={MyVideo} type="video/webm" />
                </video>
            </motion.div>

            <div className='header-home' ref={ref}>
                <div className="header-shadow">
                    <h1>Fresh Healthy Delicious Sushi</h1>
                    <p>We made Fresh and healthy sushi with different recipes</p>
                    <Link to={"/menu"}>Order Now <RiArrowRightSLine fontSize="1.5rem" paddingTop="3rem"/></Link>
                </div>
            </div>

            <div className="bg-content">
                <div className="scroll-down">
                    <IoIosArrowDown />
                </div>
                <div className='container-sub-hero'>
                    <div className="img-container">
                        <img src={SushiChef} alt='sushi-chef' />
                    </div>
                    <div className="content">
                        <h1>Experience the Art of Omakase Sushi</h1>
                        <p>We are dedicated to providing the freshest and healthiest sushi options for our customers. Our skilled chefs carefully select the finest ingredients to create a unique dining experience.</p>
                        <div className="buttons">
                            <Link className='about-btn' to={"/about"}>Learn More</Link>
                            <Link className='register-btn' to={"/register"}>Register <RiArrowRightSLine /></Link>
                        </div>
                    </div>
                </div>
                <div className="container-popular">
                    <p>The Best Seller</p>
                    <h2>Popular Dishes</h2>
                
                    <div className="popular-products">
                        {popProducts.map((product) => (
                            <div className="product-card" key={product._id}>
                                <img src={product.imageUrl} alt="Product" />
                                <p>{product.title}</p>
                                <p>{product.portion}</p>
                                <div className="price-and-buy">
                                    <p>${(product.price).toFixed(2)}</p>
                                    {user.email ? (
                                        <button onClick={() =>
                                            addToCartHandler(
                                                product._id,
                                                product.title,
                                                product.imageUrl,
                                                product.price
                                                )
                                            }>
                                            +
                                        </button>
                                    ) : (
                                    <Link to={"/login"}>Login</Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <section className="customer-container">
                    <h2>Customer Testimonials</h2>
                    <p>Delicious sushi with fresh ingredients, a true culinary experience.</p>
                    <div className="reviews-container">
                        <div className="review">
                            <i><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></i>
                            <p className="comment">
                                "The sushi at this restaurant is absolutely amazing!"
                            </p>
                            <div className="customer-info">
                                <div className="customer-pic">
                                    <img src={JosephGonzalez} alt="customer" />
                                </div>
                                <p>John Doe</p>
                                <p>Food Critic, Food Magazine</p>
                            </div>
                        </div>
                        <div className="review">
                            <i><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></i>
                            <p className="comment">
                                "I've never had sushi this good before."
                            </p>
                            <div className="customer-info">
                                <div className="customer-pic">
                                    <img src={ChristopherCampbell} alt="customer" />
                                </div>
                                <p>Jane Smith</p>
                                <p>Food Blogger, Tasty Eats</p>
                            </div>
                        </div>
                        <div className="review">
                            <i><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></i>
                            <p className="comment">
                                "The omakase experience was exceptional, highly recommended."
                            </p>
                            <div className="customer-info">
                                <div className="customer-pic">
                                    <img src={LuisVillasmil} alt="customer" />
                                </div>
                                <p>David Johnson</p>
                                <p>CEO, Tech Solutions</p>
                            </div>
                        </div>
                        <div className="review">
                            <i><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></i>
                            <p className="comment">
                                "The chef definitely deserves a michelin star it is absolutely amazing!"
                            </p>
                            <div className="customer-info">
                                <div className="customer-pic">
                                    <img src={JuricaKoletic} alt="customer" />
                                </div>
                                <p>John Doe</p>
                                <p>Food Critic, Food Magazine</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="book-table-container">
                    <div className="book-table-content">
                        <h2>Welcome to Omakase Sushi, where sushi is an art</h2>
                        <p>Your Omakase journey awaits</p>
                        <p><strong>Book a Table:</strong> Limited seats for an intimate dining adventure.</p>
                        <p><strong>Order Online:</strong> Bring Omakase brilliance to your doorstep.</p>
                        <div className="cta-buttons">
                            <Link to={"/contact"}>Book Now</Link>
                            <Link to={"/menu"}>Order Now</Link>
                        </div>
                    </div>
                
                    <div className="book-table-img">
                        <img src={SushiBar} alt="sushi bar" />
                    </div>
                </section>
                <section className="faq-container">
                    <header>
                        <h2>Frequently Asked Questions</h2>
                        <p>Find answers to common questions about Omakase, dietary restrictions, and ingredient sourcing.</p>
                    </header>
                    <div className="questions">
                        <div className="question">
                            <p>What is Omakase</p>
                            <p>Omakase is a traditional Japanese dining experience where the chef selects and prepares a series of dishes for the guests.</p>
                        </div>
                        <div className="question">
                            <p>Are there vegetarian options?</p>
                            <p>Yes, we offer vegetarian options for guests with dietary restrictions or preferences.</p>
                        </div>
                        <div className="question">
                            <p>Where do you source your ingredients?</p>
                            <p>We source out ingredients from trusted supplier who prioritize quality and sustainability.</p>
                        </div>
                        <div className="question">
                            <p>Do you offer gluten-free options?</p>
                            <p>Yes, we have gluten-free options available. Please inform our staff about your dietary restrictions when making a reservation.</p>
                        </div>
                        <div className="question">
                            <p>Can i make reservation?</p>
                            <p>Yes, we highly recommend making a reservation in advance to secure your dining experience.</p>
                        </div>
                    </div>
                    <div className="contact-container">
                        <h4>Still have questions?</h4>
                        <p>Contact us for more information.</p>
                        <Link to={"/contact"}>Contact</Link>
                    </div>
                </section>
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
    )
}

export default Home