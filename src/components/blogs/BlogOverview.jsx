import React from 'react';
import './BlogOverview.css'
import { useSelector } from 'react-redux';

const BlogOverview = () => {

    const {blogData,blogTags,
        blogTitle,userInfo} = useSelector((state) => state?.user);
    
    console.log(blogData,blogTags,blogTitle,userInfo)
    return (
        <div className="blog-overview">
            <h1>{blogTitle}</h1>
            {blogData?.map((item,i)=>{
                return <div dangerouslySetInnerHTML={{__html: item.text}} key={i}/>
            })}
        </div>
    )
}

export default BlogOverview