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
import LogOut from './components/logout/logoutPage';
import BlogOverview from './components/blogs/BlogOverview';
import FullBlog from './components/blogs/FullBlog';
import ForgotPassword from './components/password/ForgotPassword';
import LostPage from './components/lost/LostPage';

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
          <Route path="/blog/overview" 
          element={isUser?<BlogOverview />:<Home />}
          />
          <Route path="/loginWithGoogle" 
          element={!isUser?<LoginWithGoogle />:<Home />} />
          <Route path="/create" element={isUser?<CreateBlogPage />:<Home />}/>
          <Route path="/blog/:id" element={<FullBlog />} />
          <Route path="/logout" element={isUser?<LogOut />:<Home />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="*" element={<LostPage />} />
        </Routes>
        <SideNavigation />
        <Footer />
      </BrowserRouter>
  )
}

export default App;
