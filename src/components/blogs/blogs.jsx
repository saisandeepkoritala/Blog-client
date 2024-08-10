import React,{useEffect} from 'react';
import UserBlog from './userBlog';
import './blogs.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Blogs = () => {

    useEffect(() => {
        axios.get("http://localhost:5000/api/v1/user/allBlogs",{withCredentials:true})
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))
    }, [])

    const user = useSelector((state) => state.user);
    console.log(user)



    let cardsSection = [];
    for (let i = 10; i < 20; i++) {
        cardsSection.push(<UserBlog key={i} imageSrc={`https://picsum.photos/id/${i}/350/300`}/>) 
    }



    return (
        <div className='blogs'>
            {cardsSection}
        </div>
    )
}

export default Blogs