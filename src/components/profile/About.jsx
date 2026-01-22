import React from 'react';
import './About.css';
import {useSelector} from 'react-redux';

const About = () => {
    const {email} = useSelector((state) => state.user.userInfo);

    console.log(email)
    return (
        <div>
            About 
        </div>
    )
}

export default About;