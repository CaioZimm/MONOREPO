import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({children}: { children: React.ReactNode }) => {
    const token = localStorage.getItem('token')

    if (!token && useLocation().pathname !== '/login') {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>
}

export default RequireAuth