import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { role, loading: roleLoading } = useRole();

  if (roleLoading || authLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (user && role === "admin") {
    return children;
  }

  return <Navigate to="/" />;
};

export default AdminRoute;
