import React, { useEffect ,useState} from 'react';
import './userBlog.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import User from '../../assets/user.webp';

const UserBlog = (blog) => {
    // console.log(blog)
    // console.log(blog.email)
    // console.log(blog.body)

    const [Pic,setPic] = useState(User)

    useEffect(() => {
        const getPic=async()=>{
            const resp = await axios.post(`${import.meta.env.VITE_BACKEND_URL_PROD}/api/v1/user/profilePic`,{
                email:blog.email
            })
            // console.log("hii",resp?.data?.pic)
            if(resp.status === 200){
                setPic(resp?.data?.pic)
            }
            else{
                console.log("something went wrong or no image")
            }
        }
        getPic();
        
    },[blog.email])
    return (
        <div className="blog-overview">
            <h1>{blog.title}</h1>
            {blog.body?.map((item,i)=>{
                // console.log(item)
                return <div key={i} className='blog'>
                        <div dangerouslySetInnerHTML={{__html: item.text}} className='text'/>
                        {blog.body[i]?.imageURLs?.map((item)=>{
                            // console.log(item)
                            return <img src={item} key={item} width={300}/>} )}
                    </div>
            })}
            <div className='tags'>
                {blog.tags?.map((item,i)=>{return <div key={i} className='tag'>{item}</div>})}
            </div>
            <div className='post-blog'>
                <div>
                <img src={Pic} width={100} alt="image"/>
                </div>
                <div>
                <p><strong>Posted on</strong> {blog.createdAt?.substring(0,10)}</p>
                <p><strong>Posted at</strong> {blog.createdAt?.substring(11,19)}</p>
                <p><strong>By</strong> {blog.email}</p>
                </div>
            </div>
        </div>
    )
}

export default UserBlog