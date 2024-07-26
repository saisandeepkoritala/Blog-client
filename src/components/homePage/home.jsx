import { useLocation ,useNavigate} from 'react-router-dom';
import { setisUser,setuserInfo } from '../../store';
import { useSelector,useDispatch } from 'react-redux';
import queryString from 'query-string';
import React,{useState,useEffect} from 'react';
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
            console.log(decodedUserData);

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