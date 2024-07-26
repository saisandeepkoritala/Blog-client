import React,{useState} from 'react'
import { NavLink ,Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./navbar.css";

const Navbar = () => {

    const [openMenu,SetopenMenu] = useState(false);
    const isUser = useSelector((state) => state?.user?.isUser);
    return (
        <nav>
            <Link to="/" className='title'>
                Sai Blog
            </Link>
            <ul className={openMenu ? "open":""}>
                <li>
                        <NavLink to="/" onClick={()=>SetopenMenu(!openMenu)}>Home</NavLink>
                </li>
                <li>
                        <NavLink to="/create" onClick={()=>SetopenMenu(!openMenu)}>Create</NavLink>
                </li>
                <li>
                        <NavLink to="/blogs" onClick={()=>SetopenMenu(!openMenu)}>Blogs</NavLink>
                </li>
                {!isUser && <li>
                    <NavLink to="/login" onClick={()=>SetopenMenu(!openMenu)}>Login</NavLink>
                </li>}
                {!isUser && <li>
                    <NavLink to="/register" onClick={()=>SetopenMenu(!openMenu)}>Register</NavLink>
                </li>}
            </ul>
            <div className={openMenu?"menu cross":"menu"} onClick={()=>SetopenMenu(!openMenu)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    )
}

export default Navbar;