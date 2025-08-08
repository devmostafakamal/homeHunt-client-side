import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const AgentRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { role, loading: roleLoading } = useRole();

  if (authLoading || roleLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (user && role === "agent") {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default AgentRoute;
