import { Outlet } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundary.jsx";
import ScrollToTop from "../components/ScrollToTop";

const RouterErrorBoundary = () => {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Outlet />
    </ErrorBoundary>
  );
};
export default RouterErrorBoundary;
