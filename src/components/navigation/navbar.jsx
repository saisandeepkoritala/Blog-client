import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./navbar.css";

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const isUser = useSelector((state) => state?.user?.isUser);

    return (
        <nav>
            <Link to="/" className='title'>
                Sai Blog
            </Link>
            <ul className={openMenu ? "open" : ""}>
                <li>
                    <NavLink to="/" onClick={() => setOpenMenu(!openMenu)}>Home</NavLink>
                </li>
                {isUser && <li>
                    <NavLink to="/create" onClick={() => setOpenMenu(!openMenu)}>Create</NavLink>
                </li>}
                <li>
                    <NavLink to="/blogs" onClick={() => setOpenMenu(!openMenu)}>Blogs</NavLink>
                </li>
                {isUser && (
                    <li
                        // onMouseEnter={() => setShowProfileMenu(true)}
                        onClick={()=>setShowProfileMenu(!showProfileMenu)}
                        onMouseLeave={() => {
                            setTimeout(() => {
                                setShowProfileMenu(false)
                            },5000)
                        }}
                        className="dropdown-container"
                    >
                        <a>Profile</a>
                        {showProfileMenu && (
                            <ul className="dropdown">
                                <li><NavLink to="/about" onClick={() => setOpenMenu(!openMenu)}>About</NavLink></li>
                                <li><NavLink to="/update-password" onClick={() => setOpenMenu(!openMenu)}>Password</NavLink></li>
                                <li><NavLink to="/my-blogs" onClick={() => setOpenMenu(!openMenu)}>My Blogs</NavLink></li>
                            </ul>
                        )}
                    </li>
                )}
                {isUser && <li>
                    <NavLink to="/logout" onClick={() => setOpenMenu(!openMenu)}>Logout</NavLink>
                </li>}
                {!isUser && <li>
                    <NavLink to="/login" onClick={() => setOpenMenu(!openMenu)}>Login</NavLink>
                </li>}
                {!isUser && <li>
                    <NavLink to="/register" onClick={() => setOpenMenu(!openMenu)}>Register</NavLink>
                </li>}
            </ul>
            <div className={openMenu ? "menu cross" : "menu"} onClick={() => setOpenMenu(!openMenu)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    );
}

export default Navbar;
