import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setisUser } from '../../../store/index';
import axios from "axios";
import {toast } from "react-toastify";
import { CiCircleInfo } from "react-icons/ci";
import './signup.css';

function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        accountType: 'normal'
    });
    const [code, setCode] = useState("");
    const [vanish, setVanish] = useState(true);
    const [showVerify, setShowVerify] = useState(false);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Ref = useRef();

    useEffect(() => {
        Ref.current.focus();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Helper for Toast Styles
    const notify = (msg, type = 'error') => {
        const config = {
            theme: 'colored',
            style: type === 'error' ? { background: "#fff5f5", color: "#e53e3e" } : { background: "#f0fff4", color: "#38a169" }
        };
        type === 'error' ? toast.error(msg, config) : toast.success(msg, config);
    };

    const verifyPassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
        return regex.test(password);
    };

    const handleSendCode = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email) return notify("Please fill in Name and Email");
        
        try {
            const resp = await axios.post(`${import.meta.env.VITE_BACKEND_URL_PROD}/api/v1/user/sendCode`, {
                name: formData.name,
                email: formData.email
            });
            if (resp.status === 200) {
                setShowVerify(true);
                notify("Verification code sent to email!", "success");
            }
        } catch (err) {
            notify("Email already exists or server error");
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL_PROD}/api/v1/user/verifyCode`, {
                email: formData.email,
                code: code
            });
            if (response.status === 200) {
                setVanish(false);
                setShowVerify(false);
                notify("Email Verified!", "success");
            }
        } catch (err) {
            notify("Invalid verification code");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.passwordConfirm) return notify("Passwords do not match");
        if (!verifyPassword(formData.password)) return notify("Password does not meet criteria");

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL_PROD}/api/v1/user/signup`, formData);
            if (!response.data.error) {
                notify("Account created!,please login", "success");
                navigate("/");
            }
        } catch (err) {
            notify("Sign up failed, please try again");
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-card">
                <h2>Create Account</h2>
                <p className="subtitle">Join us to start your journey</p>

                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="input-group">
                        <label>Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" ref={Ref} required />
                    </div>

                    <div className="input-group">
                        <label>Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required disabled={!vanish} />
                    </div>

                    {vanish && (
                        <div className="verification-section">
                            <div className="code-row">
                                <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter 6-digit code" />
                                <button type="button" className="btn-send" onClick={handleSendCode}>Send Code</button>
                            </div>
                            {showVerify && (
                                <button type="button" className="btn-verify" onClick={handleVerifyCode}>Verify Email</button>
                            )}
                        </div>
                    )}

                    {!vanish && (
                        <>
                            <div className="input-group">
                                <label>Password</label>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required />
                            </div>
                            <div className="input-group">
                                <label>Confirm Password</label>
                                <input type="password" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} placeholder="••••••••" required />
                            </div>
                            
                            <div className="info-box">
                                <CiCircleInfo className="info-icon" />
                                <p>Password must be 8+ chars with uppercase, lowercase, number, and symbol.</p>
                            </div>

                            <button type="submit" className="btn-submit">Sign Up</button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Signup;