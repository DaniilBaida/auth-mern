import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const VerificationProtectedRoute = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (user?.isVerified) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default VerificationProtectedRoute;
