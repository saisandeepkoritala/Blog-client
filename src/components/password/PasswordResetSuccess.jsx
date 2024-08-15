import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import './SuccessPage.css';


const PasswordResetSuccess = () => {
    const navigate = useNavigate();

    const handleClick=()=>{
        navigate("/")
    }
    return (
        <div className="success-container">
        <h1><FaCheckCircle className="success-icon" /> </h1>
        <h2>Password Reset Successful!</h2>
        <p className="success-message">Your password has been successfully reset.</p>
        <p className="link" onClick={handleClick}>Click here to back Home</p>
        </div>
    )
}

export default PasswordResetSuccess