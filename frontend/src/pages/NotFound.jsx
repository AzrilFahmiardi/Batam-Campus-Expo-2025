import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="flex h-screen items-center justify-center"
      style={{
        background:
          "linear-gradient(180deg, rgba(41, 128, 185, 1), rgba(109, 213, 250, 1), rgba(255, 255, 255, 1))",
      }}
    >
      <div className="flex flex-col justify-center">
        <p className="text-center text-9xl font-bold text-blue-50">404</p>
        <p className="text-center font-semibold text-blue-50">
          Ups! Halaman tidak ditemukan 😔
        </p>
        <Link
          className="mx-auto mt-5 w-40 rounded-full bg-blue-500 px-4 py-2 text-center text-white hover:opacity-80"
          to="/"
        >
          Kembali
        </Link>
        <p className="mt-5 text-center text-xs">
          &copy; Tim IT Batam Campus Expo 2025
        </p>
      </div>
    </div>
  );
};
export default NotFound;
