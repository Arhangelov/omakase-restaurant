import { useContext, useEffect } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { toast, Toaster } from 'react-hot-toast';
import { toastErrorHandler } from './utils/toastErrorHandling';


import { Context } from './store/UserContext';
import { useCart } from './store/CartContext';
import { useCartQty } from './store/CartQtyContext';

//Pages for routing
import Home from './components/Home/Home';
import About from './components/About/About';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Contact from './components/Contact/Contact';
import Menu from './components/Menu/Menu';
import Cart from './components/Cart/Cart';
import TypeOfSushi from './components/TypeOfSushi/TypeOfSushi';
import Details from './components/Details/Details';
import FinishedOrder from './components/FinishedOrder/FinishedOrder';

import './App.css';
import { getCartService } from './services/cartService';
import Navigation from './components/Navigation/Navigation';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [ cart, setCart] = useCart();
  const [ cartQty, setCartQty] = useCartQty();
  const [ user, setUser ] = useContext(Context);

  //check if user token is expired
  const isTokenExpired = (token) => {
    if(!token) return true;

    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // in seconds

    return decoded.exp < currentTime; // token is expired if currentTime is bigger then decoded.exp
  };

  // Check if user data is in localStorage and clear data ig token is expired
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("userToken");

    if(savedUser && savedToken) {
      if(isTokenExpired(savedToken)) {
        // Token is expired, clear it
        localStorage.clear();
        setUser({ email: '', username: '', address: '' });
      } else {
        // Token is valid
        setUser(JSON.parse(savedUser));
      }
    }
  },[])

  useEffect(() => {
    if (user.email) {
      getCartService(user.email)
        .then((cart) => {
          setCart(cart.products);
          setCartQty(cart.sumQty);
        })
      }
    }, [user.email, setCart, setCartQty])
    
    return (
      <div className="App">
        <Toaster />
        <Navigation />
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:type" element={<TypeOfSushi />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/menu/details/:productId" element={<Details />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/finished-order' element={<FinishedOrder/>} />
        </Routes>

        <footer className="footer-container">
                  <div className="nav-subscribe-container">
                      <div className="logo-nav-container">
                          <h2>Omakase</h2>
                          <div className="footer-navigation">
                              <Link to={"/about"}>About</Link>
                              <Link to={"/menu/all"}>Menu</Link>
                              <Link to={"/contact"}>Contact</Link>
                              <Link to={"/menu/all"}>Order</Link>
                          </div>
                      </div>
                  </div>

                  <div className="policy-rights-container">
                      <div className="policy-container">
                          <Link to={"/policy"}>Privacy Policy</Link>
                          <Link to={"/terms"}>Terms of Service</Link>
                          <Link to={"/cookie"}>Cookie Policy</Link>
                      </div>
                      <div className="rigths-container">
                          <p>&copy; 2023 Omakase Sushi. All rights reserved.</p>
                      </div>
                  </div>
        </footer>
      </div>
    );
}

export default App;
