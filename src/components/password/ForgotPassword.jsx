import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';
import { useNavigate } from 'react-router-dom';
import Notify from '../Utils/Toast';
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
    const navigate = useNavigate();
    
    // Form States
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // UI/Flow States
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Password
    const [loading, setLoading] = useState(false);

    const handleSubmitEmail = async () => {
        if (!email) return Notify("Please enter your email", "red");
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL_PROD}/api/v1/user/forgotPassword`, { email }, { withCredentials: true });
            if (response.status === 200) {
                setStep(2);
                Notify("OTP sent to your email!!", "green");
            }
        } catch (error) {
            Notify("Email not found or server error", "red");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async () => {
        if (!code) return Notify("Please enter the code", "red");
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL_PROD}/api/v1/user/verifyForgotOtp`, { email, passwordToken: code }, { withCredentials: true });
            if (response.status === 200) {
                setStep(3);
                Notify("Verification success!!", "green");
            }
        } catch (error) {
            Notify("Invalid code!!", "red");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitPassword = async () => {
        if (password !== confirmPassword) return Notify("Passwords do not match!!", "red");
        if (password.length < 6) return Notify("Password too short", "red");
        
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL_PROD}/api/v1/user/updatePassword`, { email, password, confirmPassword }, { withCredentials: true });
            if (response.status === 200) {
                Notify("Password reset success", "green");
                navigate("/passwordResetSuccess");
            }
        } catch (error) {
            Notify("Password reset failed!!", "red");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='forgot-password-container'>
            <div className='forgot-password'>
                <h2>Reset Password</h2>
                
                {step === 1 && (
                    <>
                        <label>Email Address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" />
                        <button onClick={handleSubmitEmail} disabled={loading}>
                            {loading ? "Sending..." : "Send Reset Code"}
                        </button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <label>Enter Verification Code</label>
                        <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="000000" />
                        <button onClick={handleVerifyCode} disabled={loading}>
                            {loading ? "Verifying..." : "Verify Code"}
                        </button>
                    </>
                )}

                {step === 3 && (
                    <>
                        <label>New Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                        <label>Confirm Password</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" />
                        <button onClick={handleSubmitPassword} disabled={loading}>
                            {loading ? "Updating..." : "Update Password"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;