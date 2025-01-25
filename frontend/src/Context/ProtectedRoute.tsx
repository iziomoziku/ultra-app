import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = () => {
    const { user, loading } = useAuth();

     // Wait for loading to complete
     if (loading) {
        return <div>Loading...</div>; // Show a loading indicator while checking auth
    }

    return user ? <Outlet /> : <Navigate to="/signup" />;
};

export default ProtectedRoute;
