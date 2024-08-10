import React,{useEffect} from 'react';
import axios from 'axios';

const LogoutPage = () => {

    useEffect(() => {
        const handleLogout=async()=>{
            const resp = await axios.post(`${import.meta.env.VITE_BACKEND_URL_PROD}/api/v1/user/logout`,{},{withCredentials:true})
            console.log(resp)
            if(resp.status === 200){
            localStorage.removeItem("user-info");
            window.location.href = "/";
            }
        }

        handleLogout()
    }, [])



    return (
        <div>LogoutPage</div>
    )
}

export default LogoutPage