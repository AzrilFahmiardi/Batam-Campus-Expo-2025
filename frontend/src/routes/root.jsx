import { createBrowserRouter } from "react-router-dom";
import Kampus from "../pages/Kampus";
import Kegiatan from "../pages/Kegiatan";
import LandingPage from "../pages/LandingPage";
import NotFound from "../pages/NotFound";
import Voting from "../pages/Voting";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/kampus",
    element: <Kampus />,
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
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
