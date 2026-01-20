import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/Authcontext.jsx";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuthContext();
  
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
}

