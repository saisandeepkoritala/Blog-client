import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import './SuccessPage.css';

const PasswordResetSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="success-container">
            <div className="success-card">
                <FaCheckCircle className="success-icon" />
                <h2>Password Updated!</h2>
                <p className="success-message">
                    Your password has been successfully reset. You can now log in with your new credentials.
                </p>
                <button className="home-button" onClick={() => navigate("/")}>
                    Back to Login
                </button>
            </div>
        </div>
    );
};

export default PasswordResetSuccess;