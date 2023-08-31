import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import avatar from "../images/Netflix-avatar.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };
    window.addEventListener('scroll', handleScroll);
    // return () => {
    //   window.removeEventListener('scroll', handleScroll);
    // };
  }, []);
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 z-[100] w-full fixed h-20"
      style={{backgroundColor: isScrolled ? '#0B0E15' : 'transparent'}}
    >
      <Link to="/">
        <h1 className="text-red-600 tracking-widest text-4xl font-bold cursor-pointer">
          NETFLIX
        </h1>
      </Link>
      {user?.email ? (
        <div className="flex flex-row justify-between">
          <Link to="/account">
            <button className="text-white pr-4">
              <img className="w-10 h-10 rounded-full" src={avatar} alt="Account" />
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-6 py-2 h-[50%] rounded-full cursor-pointer text-white"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="text-white pr-4">Sign In</button>
          </Link>
          <Link to="/signup">
            <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;