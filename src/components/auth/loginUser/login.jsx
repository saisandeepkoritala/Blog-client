import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setisUser, setuserInfo } from "../../../store";
import ColoredCircle from '../../active/ColoredCircle';
import { FcGoogle } from "react-icons/fc";
import { FiHelpCircle } from "react-icons/fi";
import axios from "axios";
import Notify from "../../Utils/Toast";
import "./login.css";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputEmailRef = useRef();
    
    const [color, setColor] = useState("red");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    // API Config
    const API = axios.create({
        baseURL: import.meta.env.VITE_BACKEND_URL_PROD,
        withCredentials: true
    });

    // Server Health Check Logic
    useEffect(() => {
        inputEmailRef.current?.focus();

        const checkServer = async () => {
            try {
                const res = await API.get('/api/v1/user/isAlive');
                if (res.status === 200) setColor("green");
            } catch (err) {
                setColor("red");
            }
        };

        // Initial check
        checkServer();

        // Polling interval (only if red)
        const interval = setInterval(() => {
            if (color === "red") checkServer();
        }, 5000); // 5 seconds is gentler than 1 second

        return () => clearInterval(interval);
    }, [color]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const resp = await API.post('/api/v1/user/login', {
                email: formData.username,
                password: formData.password
            });

            if (resp.status === 200) {
                const userEmail = resp?.data?.data?.user?.email;
                dispatch(setuserInfo(userEmail));
                dispatch(setisUser(true));
                localStorage.setItem("user-info", JSON.stringify({ email: userEmail }));
                navigate("/");
                Notify("Login successful! Welcome back.");
            }
        } catch (error) {
            console.error("Login Error:", error);
            Notify("Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login-container'>
            <div className='login-card'>
                
                <header>
                    <h2>Welcome Back</h2>
                    <p className="subtitle">Please enter your details</p>
                </header>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="johndoe@gmail.com"
                            ref={inputEmailRef}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type='password'
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? "Authenticating..." : "Login"}
                    </button>
                </form>

                <div className="divider"><span>OR</span></div>

                <button
                    type="button" 
                    className='register-link'
                    onClick={() => navigate("/register")}
                >
                    Don't have an account? <strong>Sign Up</strong>
                </button>

                <div className='footer-actions'>
                    <button className='action-btn' onClick={() => navigate("/forgotPassword")}>
                        <FiHelpCircle />
                        <span className='p-tag'>Forgot Password</span>
                    </button>
                    
                    <a className='action-btn google' href={`${import.meta.env.VITE_BACKEND_URL_PROD}/api/v1/user/auth/google`}>
                        <FcGoogle />
                        <span className='p-tag'>Google</span>
                    </a>
                </div>

                <div className="status-indicator">
                    <span>Server Status</span>
                    <ColoredCircle color={color} />
                </div>
            </div>
        </div>
    );
};

export default Login;