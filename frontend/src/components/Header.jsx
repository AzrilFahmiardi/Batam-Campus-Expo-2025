import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import FLogo from "../assets/images/batamexpo-logo.svg";
import SLogo from "../assets/images/header-logo.png";
import Menu from "../assets/images/menu.png";
import { checkLoginStatus, handleGoogleLogin, Logout } from '../utils/authentication';
import logout_icon from '../assets/images/LandingPage/logout.png'
import blue_logout_icon from '../assets/images/LandingPage/logout_blue.png'


const Header = ({user}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed left-0 right-0 flex items-center justify-between px-5 py-5 transition-all duration-300 lg:px-[65px] ${
        isScrolled
          ? "mx-5 mt-5 rounded-full bg-white text-[#2980B9] shadow-md lg:mx-10"
          : "bg-transparent text-white"
      }`}
      style={{ zIndex: 20 }}
    >
      <div className="flex items-center space-x-8">
        <img
          src={isScrolled ? SLogo : FLogo}
          alt="logo"
          className="w-auto max-w-[130px] md:max-w-[240px]"
        />
      </div>

      <div className="flex lg:hidden">
        <button onClick={toggleMenu}>
          <img src={Menu} alt="Menu" className="mr-2 h-4" />
        </button>
      </div>

      <nav className={`hidden items-center space-x-8 lg:flex`}>
        <NavLink
          to={"/"}
          className={`font-black ${
            isScrolled
              ? "text-[#2980B9] hover:text-[#206A96]"
              : "text-white hover:text-gray-200"
          }`}
        >
          Home
        </NavLink>
        <NavLink
          to={"/voting"}
          className={`font-medium ${
            isScrolled
              ? "text-[#2980B9] hover:text-[#206A96]"
              : "text-white hover:text-gray-200"
          }`}
        >
          Voting
        </NavLink>
        <NavLink
          to={"/kampus"}
          className={`font-medium ${
            isScrolled
              ? "text-[#2980B9] hover:text-[#206A96]"
              : "text-white hover:text-gray-200"
          }`}
        >
          Kampus
        </NavLink>
        <NavLink
          to={"/kegiatan"}
          className={`font-medium ${
            isScrolled
              ? "text-[#2980B9] hover:text-[#206A96]"
              : "text-white hover:text-gray-200"
          }`}
        >
          Kegiatan
        </NavLink>

        <img
          src="./src/assets/images/pipe.svg"
          alt="separator"
          className="h-6"
        />

        <button
        onClick={() => {
          user ? Logout() : handleGoogleLogin();

          
        }}
          className={`flex items-center rounded-[10px] px-[18px] py-2 font-bold font-montserrat ${
            isScrolled
              ? "bg-[#2980B9] text-white hover:bg-[#206A96]"
              : "bg-white text-[#3892C7] hover:bg-gray-200"
          }`}
        >        
        {user ? (
        <>
          {user.username} 
          <img src={isScrolled ? logout_icon : blue_logout_icon} alt="logout" className="ml-3 h-5" />
        </>
      ) : 'Sign Up'}
     
          
        </button>
      </nav>

      {isMenuOpen && (
        <div
          className={`absolute right-5 top-16 flex flex-col space-y-4 rounded-lg ${
            isScrolled ? "bg-white text-[#2980B9]" : "bg-[#3892C7] text-white"
          } p-5 shadow-lg lg:hidden`}
        >
          <NavLink to={"/"} className="font-black hover:text-gray-200">
            Home
          </NavLink>
          <NavLink to={"/voting"} className="font-medium hover:text-gray-200">
            Voting
          </NavLink>
          <NavLink to={"/kampus"} className="font-medium hover:text-gray-200">
            Kampus
          </NavLink>
          <NavLink to={"/kegiatan"} className="font-medium hover:text-gray-200">
            Kegiatan
          </NavLink>
          <button
            className={`mt-2 rounded-md px-4 py-2 font-bold flex items-center ${
              isScrolled
                ? "bg-[#2980B9] text-white hover:bg-[#206A96]"
                : "bg-white text-[#2980B9] hover:bg-gray-200"
            }`}
          >
            {user ? (
            <>
              {user.username} 
              <img src={isScrolled ? logout_icon : blue_logout_icon} alt="logout" className="ml-3 h-5" />
            </>
          ) : 'Sign Up'}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;