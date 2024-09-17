import { useContext, useEffect, useState } from 'react'
import { loginService } from '../../services/userAuthService';
import { Context } from '../../store/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { toastErrorHandler } from '../../utils/toastErrorHandling';

import "./Login.css";
import SushiVid from "../../resources/sushi-vid.mp4"

const Login = () => {
    const [user, setUser] = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        if (user.username) navigate("/");
    }, [navigate, user.username])

    const { email, password } = formData;
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const loginData = { email, password };


        if(formData.email === "" || formData.password === ""){
            toastErrorHandler("Both Email and Password are required.")
        } else {
            loginService(loginData)
                .then(res => {
                    if (res.errors) {
                        const errMsg = res.error.map(err => err.msg);
                        throw new Error(errMsg);
                    };
                    const loggedUser = {
                        email: res.userDTO.email,
                        username: res.userDTO.username,
                        address: res.userDTO.address
                    };
                    setUser(loggedUser);
                    const loggedUserStringify = JSON.stringify(loggedUser);
                    localStorage.setItem("user", loggedUserStringify);
                    localStorage.setItem("userToken", res.token);
                    navigate("/");
                }).catch(err => {
                    toastErrorHandler(err);
                })
        }
    }

    return (
        <div className='login-page-container'>
            <video width="100%" height="900"  playsInline autoPlay muted loop>
                <source src={SushiVid} type="video/mp4" />
                <source src={SushiVid} type="video/webm" />
            </video>
            <h1>Sign In</h1>
            <div className="login-container">
                <form onSubmit={onSubmit}>
                    <label htmlFor="email">Email</label>
                    <input onChange={onChange} type="email" name="email" />
                    <label htmlFor="password">Password</label>
                    <input onChange={onChange} type="password" name="password" />
                    <input type="submit" value="Sign In" />
                </form>
                <p>
                    If you don't have an account <Link to="/register">register here</Link>.
                </p>
            </div>
        </div>
    )
}

export default Login