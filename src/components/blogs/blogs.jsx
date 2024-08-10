import React,{useEffect,useState} from 'react';
import UserBlog from './userBlog';
import './blogs.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Blogs = () => {

    const [blogs,setBlogs] = useState([]);

    useEffect(() => {
        const getData = async() => {
            axios.get("http://localhost:5000/api/v1/user/allBlogs",{withCredentials:true})
            .then((res)=>setBlogs(res.data.allBlogs))
            .catch((err)=>console.log(err))
        }

        getData()
    
    }, [])

    // const user = useSelector((state) => state.user);
    // console.log(user)

    console.log(blogs)

    // const cardsSection = blogs?.map((item,i)=>{
    //     return <UserBlog key={i} {...item} />
    // })

    const cardsSection = blogs?.map((item,i)=>{
        console.log(item)
        return <div key={i} className='allBlogs'>
            <h4>{item.title}</h4>
            <p>{item.body.map((item,i)=>{
                if(i>=2){
                    return;
                }
                return (<div dangerouslySetInnerHTML={{__html: item.text.substring(0,200)+", see more..."}} className='text' key={i}/>)})}</p>
            <p className='author'><strong>By </strong> {item.email}</p>
            <p className='date'><strong>Posted on</strong> {item.createdAt.substring(0,10)}</p>
            <div className='show-tags'>{item.tags.map((item)=>(<div className='tag' key={item}>{item}</div>))}</div>
        </div>
    })

    return (
        <div className='blogs'>
            {cardsSection}
        </div>
    )
}

export default Blogs