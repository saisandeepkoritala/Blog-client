import React from 'react';
import './userBlog.css';
import { useSelector } from 'react-redux';

const UserBlog = (blog) => {
    console.log(blog)
    console.log(blog.body)
    return (
        <div className="blog-overview">
            <h1>{blog.title}</h1>
            {blog.body?.map((item,i)=>{
                console.log(item)
                return <div key={i} className='blog'>
                        <div dangerouslySetInnerHTML={{__html: item.text}} className='text'/>
                        {blog.body[i]?.imageURLs?.map((item)=>{
                            console.log(item)
                            return <img src={item} key={item} width={300}/>} )}
                    </div>
            })}
            <div className='tags'>
                {blog.tags?.map((item,i)=>{return <div key={i} className='tag'>{item}</div>})}
            </div>
            <div className='post-blog'>
            </div>
        </div>
    )
}

export default UserBlog