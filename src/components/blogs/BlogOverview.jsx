import React from 'react';
import './BlogOverview.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux';

const BlogOverview = () => {

    const {blogData,blogTags,
        blogTitle,userInfo} = useSelector((state) => state?.user);
    
    console.log(blogData,blogTags,blogTitle,userInfo)

    const navigate = useNavigate();

    const handleSubmitBlog = async(e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:5000/api/v1/user/createBlog",{
            title:blogTitle,
            tags:blogTags,
            body:blogData,
            email:userInfo?.email
        },{
            withCredentials:true
        });

        console.log(response)
        if(response.status === 200){
            navigate("/blogs");
            localStorage.clear("blog-data");
            localStorage.clear("blog-tags");
            localStorage.clear("blog-title");
        }
        else{
            console.log("something went wrong")
        }
    }

    return (
        <div className="blog-overview">
            <h1>{blogTitle}</h1>
            {blogData?.map((item,i)=>{
                return <div key={i} className='blog'>
                        <div dangerouslySetInnerHTML={{__html: item.text}} className='text'/>
                        {blogData[i]?.imageURLs?.map((item)=>{return <img src={item} key={item} width={250}/>} )}
                    </div>
            })}
            <div className='tags'>
                {blogTags?.map((item,i)=>{return <div key={i+100} className='tag'>{item}</div>})}
            </div>
            <div className='post-blog'>
            <button 
            className='button'
            onClick={handleSubmitBlog}>
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>Post Blog
                </button>
            </div>
        </div>
    )
}

export default BlogOverview