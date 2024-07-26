import React from 'react';
import './userBlog.css';
import { useSelector } from 'react-redux';

const UserBlog = ({imageSrc}) => {

    return (
        <div className='user-blog'>
            <img src={imageSrc} alt="" />
        </div>
    )
}

export default UserBlog