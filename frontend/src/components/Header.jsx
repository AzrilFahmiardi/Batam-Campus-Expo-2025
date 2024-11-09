import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed left-0 right-0 px-5 py-5 lg:px-[65px] flex justify-between items-center transition-all duration-300 ${
        isScrolled
          ? 'bg-[#3892C7] rounded-full mt-5 mx-5 lg:mx-10 shadow-md'
          : 'bg-transparent'
      }`}
      style={{ zIndex: 10 }}
    >
      <div className="flex items-center space-x-8">
        {/* Logo */}
        <img
          src="./src/assets/images/batamexpo-logo.svg"
          alt="logo"
          className="w-auto max-w-[240px]"
        />
      </div>

      {/* Hamburger Icon */}
      <div className="lg:hidden">
        <button onClick={toggleMenu}>
          <img src="./src/assets/images/menu.svg" alt="Menu" className="h-6" />
        </button>
      </div>

      {/* Nav - Hidden on Mobile and Tablet */}
      <nav className={`hidden lg:flex items-center space-x-8`}>
        <NavLink to={'/'} className="text-white font-black hover:text-gray-200">
          Home
        </NavLink>
        <NavLink
          to={'/voting'}
          className="text-white font-medium hover:text-gray-200"
        >
          Voting
        </NavLink>
        <NavLink
          to={'/kampus'}
          className="text-white font-medium hover:text-gray-200"
        >
          Kampus
        </NavLink>
        <NavLink
          to={'/kegiatan'}
          className="text-white font-medium hover:text-gray-200"
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
        <button className="px-[18px] py-2 bg-white rounded-[10px] flex items-center">
          <a href="#" className="text-blue-500 font-medium">
            Sign up
          </a>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 right-5 bg-[#3892C7] rounded-lg p-5 flex flex-col space-y-4 lg:hidden shadow-lg">
          <a href="#home" className="text-white font-black hover:text-gray-200">
            Home
          </a>
          <a
            href="#voting"
            className="text-white font-medium hover:text-gray-200"
          >
            Voting
          </a>
          <a
            href="#kampus"
            className="text-white font-medium hover:text-gray-200"
          >
            Kampus
          </a>
          <a
            href="#kegiatan"
            className="text-white font-medium hover:text-gray-200"
          >
            Kegiatan
          </a>
          <button className="px-4 py-2 bg-white rounded-md mt-2">
            <a href="#" className="text-blue-500 font-medium">
              Sign up
            </a>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
