import { NavLink } from "react-router-dom";
import BCEBlue from "../assets/images/LandingPage/BCEBlue.png";
import locationLogo from "../assets/images/LandingPage/Location.png";
import phone from "../assets/images/phone.png";
import mail from "../assets/images/mail.png";
import Instagram from "./icon/Instagram";
import Tiktok from "./icon/Tiktok";

const Footer = () => {
  return (
    <footer className="bg-footer-gradient py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Company Info */}
          <div className="space-y-4">
            <NavLink to="/" className="inline-block w-[60%] p-5 md:w-[80%]">
              <img src={BCEBlue} alt="Batam Campus Expo" />
            </NavLink>
          </div>

          {/* Useful NavLinks */}
          <div className="pl-4">
            <h2 className="mb-4 text-2xl font-bold">Useful Links</h2>
            <nav className="space-y-2">
              <NavLink
                to="/"
                className="block text-white hover:text-yellow-500"
              >
                Home
              </NavLink>
              <NavLink
                to="/voting"
                className="block text-white hover:text-yellow-500"
              >
                Voting
              </NavLink>
              <NavLink
                to="/kampus"
                className="block text-white hover:text-yellow-500"
              >
                Kampus
              </NavLink>
              <NavLink
                to="/kegiatan"
                className="block text-white hover:text-yellow-500"
              >
                Kegiatan
              </NavLink>
            </nav>
          </div>

          <div className="pl-4">
            <h2 className="mb-4 text-2xl font-bold">Lokasi & Kontak</h2>
            <div className="space-y-3">
              <p className="flex items-center text-white">
                <span className="mr-2">
                  <img src={locationLogo} alt="location" className="w-3" />
                </span>
                Batam, Kepulauan Riau, Indonesia
              </p>
              <a
                href="https://wa.me/085973050222"
                target="_blank"
                className="flex items-center text-white underline hover:text-blue-300"
              >
                <span className="mr-2">
                  <img src={phone} alt="location" className="w-3" />
                </span>
                085973050222
              </a>
              <a
                href="mailto:batamcampusexpo@gmail.com"
                className="flex items-center text-white underline hover:text-blue-300"
              >
                <span className="mr-2">
                  <img src={mail} alt="location" className="w-3" />
                </span>
                batamcampusexpo@gmail.com
              </a>
            </div>

            <div className="mt-6 flex gap-4">
              <a
                href="https://www.instagram.com/batamcampusexpo/"
                target="_blank"
                title="Instagram Bacampex"
                className="min-h-5 min-w-5 rounded-full bg-white p-1.5 text-zinc-950 transition-colors hover:bg-gray-200"
              >
                <Instagram className={"size-5"} />
              </a>
              <a
                href="https://www.tiktok.com/@batamcampusexpo"
                target="_blank"
                title="Tiktok Bacampex"
                className="min-h-5 min-w-5 rounded-full bg-white p-1.5 text-zinc-950 transition-colors hover:bg-gray-200"
              >
                <Tiktok className={"size-5"} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-white pt-8 text-center font-montserrat text-sm text-white">
          &copy; 2024 Tim IT Batam Campus Expo. Semua hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
};
export default Footer;
