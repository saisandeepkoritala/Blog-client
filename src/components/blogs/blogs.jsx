import React, { useEffect } from 'react';
import './blogs.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ColorRing } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Fetch function that returns both data and status code
const fetchBlogs = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL_PROD}/api/v1/user/allBlogs`, { 
            withCredentials: true 
        });
        return { data: response.data.allBlogs, status: response.status };
    } catch (error) {
        // Handle the error and return a custom status or rethrow the error
        if (error.response) {
            return { data: [], status: error.response.status };
        } else {
            throw new Error('Network error');
        }
    }
};

const Blogs = () => {
    const { data: blogs = [], isLoading, isError, error } = useQuery({
        queryKey: ['blogs'],
        queryFn: fetchBlogs,
    });

    const user = useSelector((state) => state.user);

    const notify = (msg, color) => {
        toast.info(msg, {
            progressStyle: { background: color },
            theme: 'colored',
            style: { background: "white", color: color },
        });
    }

    // Handle toast notifications for loading and error states
    useEffect(() => {
        if (isLoading) {
            notify("Loading content .......", "green");
        }
        if (isError) {
            notify("Something went wrong .......", "red");
        }
    }, [isLoading, isError]);

    if (isLoading) {
        return (
            <div className='loader'>
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#0000FF', '#4169E1', '#4682B4', '#1E90FF', '#6495ED', '#00BFFF', '#5F9EA0', '#87CEEB', '#B0E0E6', '#ADD8E6']}
                />
                <p>Loading content .......</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className='loader'>
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#0000FF', '#4169E1', '#4682B4', '#1E90FF', '#6495ED', '#00BFFF', '#5F9EA0', '#87CEEB', '#B0E0E6', '#ADD8E6']}
                />
                <p>Something went wrong .......</p>
            </div>
        );
    }

    if (blogs.length === 0) {
        return (
            <div>
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#0000FF', '#4169E1', '#4682B4', '#1E90FF', '#6495ED', '#00BFFF', '#5F9EA0', '#87CEEB', '#B0E0E6', '#ADD8E6']}
                />
                <p>No blogs available at the moment.</p>
            </div>
        );
    }
    console.log(blogs);

    const cardsSection = blogs?.data.map((item, i) => {
        const dateStr = new Date(item.createdAt);

        return (
            <Link key={i} className='allBlogs' to={user.isUser ? `/blog/${item._id}` : `/login`}>
                <h4>{item.title}</h4>
                <div>
                    {item.body.map((bodyItem, j) => {
                        if (j >= 2) return null;
                        return (
                            <div 
                                dangerouslySetInnerHTML={{ __html: bodyItem.text.substring(0, 200) + ", see more..." }} 
                                className='text' 
                                key={j} 
                            />
                        );
                    })}
                </div>
                <p className='author'><strong>By </strong> {item.email}</p>
                <p className='date'><strong>Posted on</strong> {item.createdAt.substring(0, 10)}</p>
                <p className='date'><strong>Posted at</strong> {dateStr.toTimeString().substring(0, 5)}</p>
                <div className='show-tags'>{item.tags.map((tag) => (<div className='tag' key={tag}>{tag}</div>))}</div>
            </Link>
        );
    });

    return (
        <div className='blogs'>
            {cardsSection}
            <ToastContainer />
        </div>
    );
}

export default Blogs;
