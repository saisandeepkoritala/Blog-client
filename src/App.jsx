import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './components/homePage/home';
import Login from './components/auth/loginUser/login';
import Register from './components/auth/signupUser/signup';
import Navbar from './components/navigation/navbar';
import Footer from './components/footerPage/footer';
import SideNavigation from './components/sidebar/sideNavigation';
import Blog from './components/blogs/blogs';
import LoginWithGoogle from './components/auth/loginByGoogle/loginGoogle';
import { useSelector } from 'react-redux';
import CreateBlogPage from './components/createBlog/createBlogPage';

function App() {

  const isUser = useSelector((state) => state?.user?.isUser);
  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" 
          element={!isUser?<Login />:<Home />} />
          <Route path="/register" 
          element={!isUser?<Register />:<Home />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/loginWithGoogle" 
          element={!isUser?<LoginWithGoogle />:<Home />} />
          <Route path="/create" element={<CreateBlogPage />}/>
        </Routes>
        <SideNavigation />
        <Footer />
      </BrowserRouter>
  )
}

export default App;
