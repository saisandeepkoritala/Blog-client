import { useLocation ,useNavigate} from 'react-router-dom';
import { setisUser,setuserInfo } from '../../store';
import { useSelector,useDispatch } from 'react-redux';
import queryString from 'query-string';
import React,{useState,useEffect} from 'react';
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
            <div className='home-text'>
                <h1>Tell Your Story to the World</h1>
                <h4>Join with us! Login or Register. Write your story and share !!</h4>
            </div>
            <div className='home-img'>

            </div>
        </div>
    )
}

export default Home;