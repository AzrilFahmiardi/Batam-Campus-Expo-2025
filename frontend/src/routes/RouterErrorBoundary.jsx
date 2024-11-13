import { Outlet } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundary.jsx";

const RouterErrorBoundary = () => {
  return (
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
  );
};
export default RouterErrorBoundary;
