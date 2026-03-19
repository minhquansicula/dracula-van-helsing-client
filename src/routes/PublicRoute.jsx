import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ROUTES } from "../constants/routes";

const PublicRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen bg-game-dark-teal flex items-center justify-center text-game-bone-white">
        Đang tải...
      </div>
    );
  }

  return !user ? <Outlet /> : <Navigate to={ROUTES.LOBBY} replace />;
};

export default PublicRoute;
