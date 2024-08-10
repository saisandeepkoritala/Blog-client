import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setisUser, setuserInfo } from "../../../store";
import ColoredCircle from '../../active/ColoredCircle';
import { ToastContainer, toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FiHelpCircle } from "react-icons/fi";
import "./login.css";
import axios from "axios";


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputEmailRef = useRef();
    const [Color, SetColor] = useState("");

    axios.defaults.withCredentials = true; 
    // important for setting up cookies.

    useEffect(() => {
        inputEmailRef.current.focus();
        axios.get(`${import.meta.env.VITE_BACKEND_URL_PROD}/api/v1/user/isAlive`)
            .then((res) => {
                if (res.status === 200) {
                    SetColor("green")
                }
            })
            .catch((err) => console.log(err))
    }, []);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const notify = (msg) => {
        toast.info(msg, {
            progressStyle: { background: "red" },
            theme: 'colored',
            style: { background: "black", color: "red" },
        });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await axios.post(`${import.meta.env.VITE_BACKEND_URL_PROD}/api/v1/user/login`, {
                email: formData.username,
                password: formData.password
            })
            if (resp.status === 200) {
                dispatch(setuserInfo(resp?.data?.data?.user?.email))
                dispatch(setisUser(true))
                localStorage.setItem("user-info", JSON.stringify({email:formData.username}));
                navigate("/")
            }
        }
        catch (e) {
            console.log("error")
            notify("invalid details")
        }

    };

    return (
        <div className='login'>
            <ToastContainer />
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="johndoe@gmail.com"
                        ref={inputEmailRef}
                    />
                </div>

                <div>
                    <label>Password </label>
                    <input
                        type='password'
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="password"
                        className='password'
                    />
                </div>

                <button type="submit">
                    Login
                </button>
            </form>

            <button
                type="submit"
                className='register'
                onClick={() => navigate("/register")}
            >
                Sign Up
            </button>
            <div className='other-ways'>
            <button
                className='forgot'
                onClick={() => navigate("/forgotPassword")}
            >
                <FiHelpCircle />
            </button>
            <a
                className='googleLogin'
                href={`${import.meta.env.VITE_BACKEND_URL_PROD}/api/v1/user/auth/google`}
            >
                <FcGoogle />
            </a>
            </div>
        </div>
    );
};

export default Login;
