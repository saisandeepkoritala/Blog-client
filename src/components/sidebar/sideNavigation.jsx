import React from 'react';
import './sideNavigation.css';
import { FaGithub, FaLinkedin,FaInstagram,FaFacebook } from "react-icons/fa";

const SideNavigation = () => {
    return (
        <div className='sidebar'>
            <a href="https://github.com/saisandeepkoritala" target="_blank"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/saisandeep980/" target="_blank"><FaLinkedin /></a>
            <a href="https://www.instagram.com/saisandeep.koritala/" target="_blank"><FaInstagram /></a> 
            <a href="https://www.facebook.com/saisandeep.koritala/" target="_blank"><FaFacebook /></a>
        </div>
    )
}

export default SideNavigation