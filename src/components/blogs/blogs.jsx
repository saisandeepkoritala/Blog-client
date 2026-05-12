import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ColorRing } from 'react-loader-spinner';
import './blogs.css';

const fetchBlogs = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL_PROD}/api/v1/user/allBlogs`, { 
            withCredentials: true 
        });
        
        return response.data.allBlogs;
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error fetching blogs:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch blogs");
    }
};

const Loader = ({ message }) => (
    <div className='loader-container'>
        <ColorRing
            visible={true}
            height="100"
            width="100"
            // Using a palette of professional blues for loading
            colors={['#3b82f6', '#60a5fa', '#93c5fd', '#60a5fa', '#3b82f6']}
        />
        <p className="loader-text">{message}</p>
    </div>
);

const Blogs = () => {
    const { data: blogs = [], isLoading, isError } = useQuery({
        queryKey: ['blogs'],
        queryFn: fetchBlogs,
    });

    const user = useSelector((state) => state.user);

    if (isLoading) return <Loader message="Loading content..." />;
    if (isError) return <Loader message="Something went wrong." />;
    if (blogs.length === 0) return <Loader message="No blogs available." />;

    return (
        <div className='blogs'>
            {blogs.map((item) => (
                <Link key={item._id} className='allBlogs' to={user.isUser ? `/blog/${item._id}` : `/login`}>
                    <h4>{item.title}</h4>
                    <div className='text-preview'>
                        {/* Simple slice to show snippet without breaking HTML logic */}
                        <div dangerouslySetInnerHTML={{ __html: `${item.body[0]?.text.substring(0, 150)}...` }} />
                    </div>
                    <div className='blog-meta'>
                        <p className='author'><strong>By:</strong> {item.email}</p>
                        <p className='date'>{new Date(item.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className='show-tags'>
                        {item.tags.map((tag) => <span className='tag' key={tag}>{tag}</span>)}
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Blogs;