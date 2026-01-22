import { useLocation ,useNavigate} from 'react-router-dom';
import { setisUser,setuserInfo } from '../../store';
import { useSelector,useDispatch } from 'react-redux';
import queryString from 'query-string';
import {useState,useEffect} from 'react';

import axios from 'axios';
import "./home.css";

const Home = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);
    const isUser = useSelector((store)=>store.user.isUser);

    useEffect(() => {
        const queryParams = queryString.parse(location.search);
        if (queryParams.userData) {
            const decodedUserData = JSON.parse(decodeURIComponent(queryParams.userData));
            setUserData(decodedUserData);

            const userName = decodedUserData.displayName
            const email = decodedUserData.email

            dispatch(setuserInfo({userName,email}));
            localStorage.setItem("user-info",JSON.stringify({email}));

            console.log(decodedUserData.email);
            console.log(decodedUserData.displayName);
            console.log(decodedUserData.picture);

            // const response =axios.post(`${import.meta.env.VITE_BACKEND_URL_PROD}/api/v1/user/signup`,{
            //     name:decodedUserData.displayName,
            //     email:decodedUserData.email,
            //     picture:decodedUserData.picture,
            //     accountType:'google'
            // })

            // console.log(response);


            if(decodedUserData){
                dispatch(setisUser(true))
                navigate("/");
            }
        }
    }, [dispatch,navigate,location.search]);

    return (
        <div className='home'>
            <div className="home-text">
                <h1>Tell Your Story to the World</h1>

                <p>
                    Everyone has a story worth sharing. Your experiences, thoughts, ideas, and
                    journeys can inspire others, spark conversations, and create impact across
                    the globe.
                </p>

                <h4>Let Your Voice Be Heard</h4>
                <p>
                    Whether you are a writer, developer, traveler, student, or dreamer, this is
                    your space to express yourself freely and authentically.
                </p>

                <h4>Write. Publish. Inspire.</h4>
                <p>
                    Create blogs, share personal stories, technical insights, or creative ideas.
                    Connect with a growing community that values originality and meaningful
                    content.
                </p>

                <h4>Join Our Community Today</h4>
                <p>
                    Login or register to start writing your story. Share your voice, engage with
                    readers, and leave your mark. Your story matters — let the world read it.
                </p>
                <h4>Start Your Journey Now!</h4>
                <p>
                    Sign up or log in to begin your blogging adventure. Unleash your creativity,
                    connect with like-minded individuals, and make a difference through your
                    words.
                </p>
                </div>

            <div className='home-img'>

            </div>
        </div>
    )
}

export default Home;