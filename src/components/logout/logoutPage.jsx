import React, { useEffect } from 'react';
import axios from 'axios';
import './Logout.css';

const LogoutPage = () => {
    axios.defaults.withCredentials = true;

    useEffect(() => {
        const handleLogout = async () => {
            // 1. Create a controller to cancel the request
            const controller = new AbortController();
            
            // 2. Set a timer to abort the request and force logout after 5 seconds
            const timeoutId = setTimeout(() => {
                controller.abort();
                console.log("Request timed out. Forcing local logout...");
                forceLocalLogout();
            }, 5000);

            try {
                const resp = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL_PROD}/api/v1/user/logout`,
                    {},
                    { 
                        withCredentials: true,
                        signal: controller.signal // Link the abort signal
                    }
                );

                clearTimeout(timeoutId); // Clear timer if response comes back fast
                
                if (resp.status === 200) {
                    forceLocalLogout();
                }
            } catch (error) {
                // If it was an intentional abort, error.name will be 'CanceledError'
                console.error("Logout Error:", error.message);
                forceLocalLogout();
            }
        };

        const forceLocalLogout = () => {
            localStorage.removeItem("user-info");
            window.location.href = "/";
        };

        handleLogout();
    }, []);

    return (
        <div className='logout'>
            <div className='logout-page'>
                <h3>Logging you out...</h3>
                <p>Please wait while we secure your session.</p>
                {/* Loader */}
            </div>
        </div>
    );
};

export default LogoutPage;