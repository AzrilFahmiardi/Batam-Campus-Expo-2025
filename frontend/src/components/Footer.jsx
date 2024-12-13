import { NavLink } from "react-router-dom";
import BCEBlue from "../assets/images/LandingPage/BCEBlue.png";
import locationLogo from "../assets/images/LandingPage/Location.png"
import phone from "../assets/images/phone.png"
import mail from "../assets/images/mail.png"

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
          <div className=" pl-4">
            <h2 className="mb-4 text-2xl font-bold">
              Useful NavLinks
            </h2>
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
            <h2 className="mb-4 text-2xl font-bold">
              Lokasi & Kontak
            </h2>
            <div className="space-y-3">
              <p className="flex items-center text-white">
                <span className="mr-2"><img src={locationLogo} alt="location" className="w-3" /></span>
                Batam, Kepulauan Riau, Indonesia
              </p>
              <p className="flex items-center text-white">
                <span className="mr-2"><img src={phone} alt="location" className="w-3" /></span>
                0858 nanti malam kita balapan
              </p>
              <NavLink
                href="mailto:info@icmssc.com"
                className="flex items-center text-white underline hover:text-blue-300"
              >
               <span className="mr-2"><img src={mail} alt="location" className="w-3" /></span>
                belumada@email.com
              </NavLink>
            </div>

              <div className="mt-6 flex gap-4">
                <NavLink
                  href="#"
                  className="rounded-full bg-white p-2 text-zinc-950 transition-colors hover:bg-gray-200"
                >
                  <img src={phone} alt="location" className="w-3" />

                  {/* <Facebook className="h-5 w-5" /> */}
                </NavLink>
                <NavLink
                  href="#"
                  className="rounded-full bg-white p-2 text-zinc-950 transition-colors hover:bg-gray-200"
                >
                  <span className="sr-only">WhatsApp</span>
                  <span className="block h-5 w-5">📱</span>
                </NavLink>
                <NavLink
                  href="#"
                  className="rounded-full bg-white p-2 text-zinc-950 transition-colors hover:bg-gray-200"
                >
                  <span className="sr-only">YouTube</span>
                  {/* <Youtube className="h-5 w-5" /> */}
                </NavLink>
              </div>
            </div>
          </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-white pt-8 text-center text-sm text-white font-montserrat">
          &copy; 2024 Tim IT Batam Campus Expo. Semua hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
};
export default Footer;
