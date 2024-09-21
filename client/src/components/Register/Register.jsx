import { useContext, useEffect, useState } from 'react';
import { Context } from "../../store/UserContext";
import { useNavigate, Link } from 'react-router-dom';
import { registerService } from '../../services/userAuthService';
import { toastErrorHandler } from '../../utils/toastErrorHandling';

import "./Register.css";
import SushiVid from "../../resources/sushi-vid.mp4";
import { toastSuccessHandler } from '../../utils/toastSuccessHandling';

const Register = () => {
    const [user, setUser] = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        address: "",
    });
    useEffect(() => {
        if (user.username) navigate("/");
    }, [navigate, user.username])

    const { email, username, password, confirmPassword, address } = formData;
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        //Check if any of the fields are empty
        const hasEmptyFields = Object.values(formData).some(value => value === "");

        //If any of the fields are empty return error notification and does not send request to server.
        if(hasEmptyFields) {
            toastErrorHandler("All fields are required.")
        } else {
            if (password !== confirmPassword) {
                console.log("Password do not match");
            } else {
                const newUser = {
                    email,
                    username,
                    password,
                    confirmPassword,
                    address
                };

                registerService(newUser)
                    .then(response => {
                        if (response.errors) {
                            const errMsg = response.errors.map(err => err.msg);
                            throw new Error(errMsg);
                        }
                        setUser({ email: response.newUserDTO.email, username: response.newUserDTO.username, address: response.newUserDTO.address });
                        const currentUserStringify = JSON.stringify({ email: response.newUserDTO.email, username: response.newUserDTO.username, address: response.newUserDTO.address });
                        localStorage.setItem('user', currentUserStringify);
                        localStorage.setItem('userToken', response.token);
                        navigate("/");
                        toastSuccessHandler("🧑 You'r register was successful.")
                    }).catch(err => {
                        toastErrorHandler(err);
                    });
            }
        }
    }

    return (
        <div className='register-page-container'>
            <video width="100%" height="900" playsInline autoPlay muted loop>
                <source src={SushiVid} type="video/mp4" />
                <source src={SushiVid} type="video/webm" />
            </video>
            <h1>Sign Up</h1>
            <div className="register-container">
                <form onSubmit={(e) => onSubmit(e)}>
                    <label htmlFor="email">Email</label>
                    <input onChange={onChange} type="email" name="email" />
                    <label htmlFor="username">Username</label>
                    <input onChange={onChange} type="text" name="username" />
                    <label htmlFor="password">Password</label>
                    <input onChange={onChange} type="password" name="password" />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input onChange={onChange} type="password" name="confirmPassword" />
                    <label htmlFor="address">Address</label>
                    <input onChange={onChange} type="text" name="address" />
                    <input onChange={onChange} type="submit" value="Register" />
                </form>
                <p>
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </div>
        </div>
    )
}

export default Register