import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
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
          ? "mx-5 mt-5 rounded-full bg-[#3892C7] shadow-md lg:mx-10"
          : "bg-transparent"
      }`}
      style={{ zIndex: 20 }}
    >
      <div className="flex items-center space-x-8">
        {/* Logo */}
        <img
          src="./src/assets/images/batamexpo-logo.svg"
          alt="logo"
          className="w-auto max-w-[180px] md:max-w-[240px]"
        />
      </div>

      {/* Hamburger Icon */}
      <div className="flex translate-y-1 lg:hidden">
        <button onClick={toggleMenu}>
          <img src="./src/assets/images/menu.svg" alt="Menu" className="h-6" />
        </button>
      </div>

      {/* Nav - Hidden on Mobile and Tablet */}
      <nav className={`hidden items-center space-x-8 lg:flex`}>
        <NavLink to={"/"} className="font-black text-white hover:text-gray-200">
          Home
        </NavLink>
        <NavLink
          to={"/voting"}
          className="font-medium text-white hover:text-gray-200"
        >
          Voting
        </NavLink>
        <NavLink
          to={"/kampus"}
          className="font-medium text-white hover:text-gray-200"
        >
          Kampus
        </NavLink>
        <NavLink
          to={"/kegiatan"}
          className="font-medium text-white hover:text-gray-200"
        >
          Kegiatan
        </NavLink>

        {/* Separator */}
        <img
          src="./src/assets/images/pipe.svg"
          alt="separator"
          className="h-6"
        />

        {/* Sign Up Button */}
        <button className="flex items-center rounded-[10px] bg-white px-[18px] py-2">
          <a href="#" className="font-medium text-blue-500">
            Sign up
          </a>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute right-5 top-16 flex flex-col space-y-4 rounded-lg bg-[#3892C7] p-5 shadow-lg lg:hidden">
          <a href="/home" className="font-black text-white hover:text-gray-200">
            Home
          </a>
          <a
            href="/voting"
            className="font-medium text-white hover:text-gray-200"
          >
            Voting
          </a>
          <a
            href="/kampus"
            className="font-medium text-white hover:text-gray-200"
          >
            Kampus
          </a>
          <a
            href="/kegiatan"
            className="font-medium text-white hover:text-gray-200"
          >
            Kegiatan
          </a>
          <button className="mt-2 rounded-md bg-white px-4 py-2">
            <a href="#" className="font-medium text-blue-500">
              Sign up
            </a>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
