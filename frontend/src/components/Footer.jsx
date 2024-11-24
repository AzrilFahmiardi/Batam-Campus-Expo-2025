import { Link } from "react-router-dom";
import BCEBlue from "../assets/images/LandingPage/BCEBlue.png";

const Footer = () => {
  return (
    <footer className="py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block w-[60%] p-5 md:w-[80%]">
              <img src={BCEBlue} alt="Batam Campus Expo" />
            </Link>
            <p className="text-sm leading-relaxed text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              maxime, aliquid illo ipsa reprehenderit iure ipsam porro,
              provident consequuntur voluptatem hic nemo a esse voluptas! Cum
              corporis autem voluptatibus magni. voluptatem hic nemo a esse
              voluptas! Cum corporis autem voluptatibus magni.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h2 className="mb-4 text-2xl font-bold">
              Useful Links
              <span className="mt-2 block h-1 w-12 bg-yellow-500"></span>
            </h2>
            <nav className="space-y-2">
              <Link
                href="#"
                className="block text-gray-300 hover:text-yellow-500"
              >
                Home
              </Link>
              <Link
                href="/voting"
                className="block text-gray-300 hover:text-yellow-500"
              >
                Voting
              </Link>
              <Link
                href="/kampus"
                className="block text-gray-300 hover:text-yellow-500"
              >
                Kampus
              </Link>
              <Link
                href="/kegiatan"
                className="block text-gray-300 hover:text-yellow-500"
              >
                Kegiatan
              </Link>
            </nav>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold">
              Lokasi & Kontak
              <span className="mt-2 block h-1 w-12 bg-yellow-500"></span>
            </h2>
            <div className="space-y-3">
              <p className="flex items-start text-gray-300">
                <span className="mr-2">🏢</span>
                Batam, Kepulauan Riau, Indonesia
              </p>
              <p className="flex items-center text-gray-300">
                <span className="mr-2">📞</span>
                0858 nanti malam kita balapan
              </p>
              <Link
                href="mailto:info@icmssc.com"
                className="flex items-center text-blue-400 hover:text-blue-300"
              >
                <span className="mr-2">✉️</span>
                belumada@email.com
              </Link>
            </div>

            <div className="mt-6 flex gap-4">
              <Link
                href="#"
                className="rounded-full bg-white p-2 text-zinc-950 transition-colors hover:bg-gray-200"
              >
                <span className="sr-only">Facebook</span>
                {/* <Facebook className="h-5 w-5" /> */}
              </Link>
              <Link
                href="#"
                className="rounded-full bg-white p-2 text-zinc-950 transition-colors hover:bg-gray-200"
              >
                <span className="sr-only">WhatsApp</span>
                <span className="block h-5 w-5">📱</span>
              </Link>
              <Link
                href="#"
                className="rounded-full bg-white p-2 text-zinc-950 transition-colors hover:bg-gray-200"
              >
                <span className="sr-only">YouTube</span>
                {/* <Youtube className="h-5 w-5" /> */}
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          &copy; 2024 Tim IT Batam Campus Expo. Semua hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
};
export default Footer;
