import React from 'react';
import UserBlog from './userBlog';
import './blogs.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import 'ldrs/tailspin'


const fetchBlogs = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL_PROD}/api/v1/user/allBlogs`, { withCredentials: true });
    return data.allBlogs;
};

const Blogs = () => {
    const { data: blogs = [], isLoading, isError } = useQuery({
        queryKey: ['blogs'],
        queryFn: fetchBlogs
    });

    const user = useSelector((state) => state.user);

    if (isLoading) {
        return <div className='loader'><l-tailspin
        size="40"
        stroke="5"
        speed="0.9"
        color="black" 
        ></l-tailspin></div>;
    }

    if (isError) {
        return <div className='loader'><div className='loader'><l-tailspin
        size="40"
        stroke="5"
        speed="0.9"
        color="black" 
        ></l-tailspin></div></div>;
    }

    const cardsSection = blogs.map((item, i) => {
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
        </div>
    );
}

export default Blogs;
