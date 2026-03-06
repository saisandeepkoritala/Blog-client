import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserBlog from './userBlog';
import './FullBlog.css'
import axios from 'axios';

const FullBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(true); // 1. New loading state

    axios.defaults.withCredentials = true;

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true); // Start loading
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL_PROD}/api/v1/user/blog/${id}`, { withCredentials: true });
                setBlog(response?.data?.blog);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false); // 2. Stop loading whether success or error
            }
        }
        getData();
    }, [id]); // Added id to dependency array for safety

    // 3. Conditional Rendering for the Loader
    if (loading) {
        return (
            <div className="loader-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className='full-blog'>
            <UserBlog {...blog} />
        </div>
    )
}

export default FullBlog;