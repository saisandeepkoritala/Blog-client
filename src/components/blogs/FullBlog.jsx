import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import UserBlog from './userBlog';
import './FullBlog.css'
import axios from 'axios';

const FullBlog = () => {

    const {id} = useParams()
    console.log(id)

    const [blog,setBlog] = useState({})

    useEffect(() => {
        const getData = async() => {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL_PROD}/api/v1/user/blog/${id}`,{withCredentials:true})
            console.log(response)
            setBlog(response?.data?.blog)
        }

        getData()
    },[])
    return (
        <div className='full-blog'>
            <UserBlog {...blog} />
        </div>
    )
}

export default FullBlog