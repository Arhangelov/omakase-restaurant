import React, { useContext, useEffect, useRef } from 'react'
import { Context } from '../../store/UserContext';
import { useCartQty } from '../../store/CartQtyContext';
import { useCart } from '../../store/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { logoutService } from '../../services/userAuthService';
import { getCartService } from '../../services/cartService';
import { toastErrorHandler } from '../../utils/toastErrorHandling';
import toast from 'react-hot-toast';
import "./Navigation.css"
import { IoCartOutline } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { FaTimes } from "react-icons/fa";
import { FaBars } from 'react-icons/fa6';

const Navigation = () => {
    // eslint-disable-next-line no-unused-vars
    const [ cart, setCart] = useCart();
    const [ cartQty, setCartQty] = useCartQty();
    const [ user, setUser ] = useContext(Context);
    const navigate = useNavigate();
    const navRef = useRef();
    
    useEffect(() => {
        if (user.email) {
            getCartService(user.email)
                .then((cart) => {
                    setCart(cart.products);
                    setCartQty(cart.sumQty);
                })
            }
    }, [user.email, setCart, setCartQty])

    const onLogoutHandler = (e) => {
        e.preventDefault();
        logoutService()
            .then((res) => {
                localStorage.clear();
                setUser({ email: '', username: '', address: '' });
                toast.success(`${res.message}`);
                navigate('/');
            })

            .catch((err) => {
                toastErrorHandler(err);
            });
    };

    
    const showNavBar = () => {
        navRef.current.classList.toggle("responsive-nav");
    }

    const hideNavbar = () => {
        navRef.current.classList.remove("responsive-nav")
    }

    const onLogoutAndHideNavBatHandler = () => {
        onLogoutHandler();
        hideNavbar();
    }

    return (
        <>
            <header className='container-header'>
                <h1><Link className='nav-logo' to="/">Omakase</Link></h1>
                <nav ref={navRef} className="container-nav">
                    <ul className='nav-list'>
                        <li>
                            <Link onClick={hideNavbar} className="nav-home" to="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link onClick={hideNavbar} className="nav-about" to="/about">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link onClick={hideNavbar} className="nav-contact" to="/contact">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link onClick={hideNavbar} className="nav-menu" to="/menu/all">
                                Menu
                            </Link>
                        </li>

                        {user.username ? (
                        <>
                            <li>
                                <Link onClick={ onLogoutAndHideNavBatHandler } className="nav-logout">
                                    Logout
                                </Link>
                            </li>

                            <li>
                                <Link onClick={hideNavbar} className="nav-profile" to="/profile">
                                    <CgProfile />
                                </Link>
                            </li>
                        </>
                        ) : (
                        <>
                            <li>
                                <Link onClick={hideNavbar} className="nav-register" to="/register">
                                    Register
                                </Link>
                            </li>
                            
                            <li>
                                <Link onClick={hideNavbar} className="nav-login" to="/login">
                                    Login
                                </Link>
                            </li>
                        </>
                        )}
                        <li>
                            <Link onClick={hideNavbar} className="nav-cart" to="/cart">
                                <IoCartOutline />
                                {cartQty !== 0 & user.email !== "" ? (
                                <div className='cart-indicator'>
                                    <p>{cartQty}</p>
                                </div>
                            ) : (
                                ""
                            )}
                            </Link>
                        </li>
                        <button className='nav-btn nav-close-btn' onClick={showNavBar}>
                            <FaTimes />
                        </button>
                    </ul>
                </nav>

                <button className='nav-btn' onClick={showNavBar}>
                    <FaBars />
                </button>
            </header>
        </>
    )
}

export default Navigation