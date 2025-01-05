import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Kampus from "../pages/Kampus";
import Kegiatan from "../pages/Kegiatan";
import LandingPage from "../pages/LandingPage";
import NotFound from "../pages/NotFound";
import Voting from "../pages/Voting";
import RouterErrorBoundary from "./RouterErrorBoundary";
import { AuthProvider } from "../utils/AuthProvider";
import DetailKampus from "../pages/DetailKampus";
import LoginPage from "../pages/Login";
import Toko from "../pages/Toko";
import TicketPage from "../pages/Ticket";

const routes = [
  {
    index: true,
    element: <LandingPage />,
  },
  {
    path: "/kampus",
    element: <Kampus />,
  },
  {
    path: "/kampus/:id",
    element: <DetailKampus />,
  },
  {
    path: "/voting",
    element: <Voting />,
  },
  {
    path: "/kegiatan",
    element: <Kegiatan />,
  },
  {
    path: "/toko",
    element: <Toko />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/ticket",
    element: <TicketPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const router = createBrowserRouter([
  {
    element: <RouterErrorBoundary />,
    children: routes,
  },
]);
const Router = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
export default Router;
