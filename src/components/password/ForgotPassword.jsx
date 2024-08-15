import React,{useState} from 'react';
import axios from 'axios';
import './ForgotPassword.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const[email,setEmail] = useState('')
    const[readOnly,setReadOnly] = useState(false);
    const[showSubmit,setShowSubmit] = useState(true)

    const[code,setCode] = useState('')
    const[codeSent,setCodeSent] = useState(false)
    const[showPassword,setShowPassword] = useState(false)

    const[password,setPassword] = useState('')
    const[confirmPassword,setConfirmPassword] = useState('')

    const verifyEmailAndSendCode = async () => {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL_PROD}/api/v1/user/forgotPassword`,{email:email}, { withCredentials: true });
        console.log(response);
        if (response.status === 200) {
            return true;
        }
        else {
            return false;
        }
    };

    const submitEnteredCode = async () => { 
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL_PROD}/api/v1/user/verifyForgotOtp`,{email:email,passwordToken:code}, { withCredentials: true });
        console.log(response);
        if (response.status === 200) {
            return true;
        }
        else {
            return false;
        }
    }

    const submitPassword = async () => { 
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL_PROD}/api/v1/user/updatePassword`,{email:email,password:password,confirmPassword:confirmPassword}, { withCredentials: true });
        console.log(response);
        if (response.status === 200) {
            return true;
        }
        else {
            return false;
        }
    }

    const notify = (msg) => {
        toast.info(msg, {
            progressStyle: { background: "green" },
            theme: 'colored',
            style: { background: "white", color: "green" },
        });
    }

    const handleSubmitEmail = () => {
        //1
        console.log("submit email")
        const result = verifyEmailAndSendCode();
        if (result) {
            setShowSubmit(false)
            setCodeSent(true)
            setReadOnly(true)
            notify("OTP sent to your email!!")   
        }
        else{
            notify("Email not found!!")
        }

    }

    const handleVerifyCode = () => {
        //2
        console.log("verify code")
        const result = submitEnteredCode();
        if (result) {
            setCodeSent(false)
            setShowPassword(true)  
            notify("Verification success!!") 
        }
        else{
            notify("Invalid code!!")
        }
    }  
    
    const handleSubmitPassword = () => {
        //3
        if (password !== confirmPassword) {
            notify("Passwords do not match!!")
            return;
        }
        console.log("submit password")
        const result = submitPassword();
        if (result) {
            console.log("password reset success")
            notify("Password reset success")
            navigate("/passwordResetSuccess")
        }
        else{
            notify("Password reset failed!!")
        }
    }
    
    return (
        <div className='forgot-password-container'>
            <div className='forgot-password'>
                <h2>Reset Password</h2>
                <label>Enter E-mail Address</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} disabled={readOnly}/>
                {showSubmit && <button type='submit' onClick={handleSubmitEmail}>Submit</button>}

                {codeSent && <input type='text'
                value={code} 
                onChange={(e)=>setCode(e.target.value)} placeholder='Enter code'/>}
                {codeSent && <button type='submit' onClick={handleVerifyCode}>Verify Code</button>}


                {showPassword && <input type='password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)} 
                placeholder='Enter new password'/>}
                {showPassword && <input type='password' 
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)} 
                placeholder='Confirm new password'/>}
                {showPassword && <button 
                type='submit' onClick={handleSubmitPassword}>Submit</button>}
            </div>
            <ToastContainer />
        </div>
    )
}

export default ForgotPassword