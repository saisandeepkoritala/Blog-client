import React,{useEffect} from 'react';
import axios from 'axios';
import './Logout.css';

const LogoutPage = () => {
    axios.defaults.withCredentials = true;
    useEffect(() => {
        const handleLogout=async()=>{
            const resp = await axios.post(`${import.meta.env.VITE_BACKEND_URL_PROD}/api/v1/user/logout`,{},{withCredentials:true})
            console.log(resp)

            // if(resp.status === 200){
            //     localStorage.removeItem("user-info");
            //     window.location.href = "/";
            // }
            // works only in real time,not in our dummy apps
            localStorage.removeItem("user-info");
                window.location.href = "/";

        }

        handleLogout()
    }, [])



    return (
        <div className='logout'>
            <div className='logout-page'>
                <h3>You have been logged out</h3>
                <p>Please log back in </p>
                <button onClick={() => window.location.href = "/"}>ok</button>
            </div>
        </div>
    )
}

export default LogoutPage