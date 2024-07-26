import React from 'react';
import './sideNavigation.css';
import { FaGithub, FaLinkedin,FaInstagram,FaFacebook } from "react-icons/fa";

const SideNavigation = () => {
    return (
        <div className='sidebar'>
            <a href="#"><FaGithub /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaInstagram /></a> 
            <a href="#"><FaFacebook /></a>
        </div>
    )
}

export default SideNavigation