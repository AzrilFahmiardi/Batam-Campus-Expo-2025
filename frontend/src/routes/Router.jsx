import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import RouterErrorBoundary from "./RouterErrorBoundary";
import { AuthProvider } from "../utils/AuthProvider";
import TokoComingSoon from "../pages/ComingSoon";
import LoadingScreen from "../components/LoadingScreen";
const Kampus = lazy(() => import("../pages/Kampus"));
const Kegiatan = lazy(() => import("../pages/Kegiatan"));
const LandingPage = lazy(() => import("../pages/LandingPage"));
const Toko = lazy(() => import("../pages/Toko"));
const TicketPage = lazy(() => import("../pages/Ticket"));
const TicketManagement = lazy(() => import("../pages/TicketManagement"));
const LoginPage = lazy(() => import("../pages/Login"));
const DetailKampus = lazy(() => import("../pages/DetailKampus"));
const Voting = lazy(() => import("../pages/Voting"));
const NotFound = lazy(() => import("../pages/NotFound"));

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
    // element: <TokoComingSoon />
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
    path: "/admin",
    element: <TicketManagement />,
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
  <Suspense fallback={<LoadingScreen />}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </Suspense>
);
export default Router;
