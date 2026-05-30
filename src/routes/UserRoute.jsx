import { Navigate } from "react-router-dom";
import  useAuth  from "../hooks/useAuth";

const UserRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    if (user.role === "COMPANY") {
      return (
        <Navigate
          to="/company/dashboard"
          replace
        />
      );
    }

    return (
      <Navigate
        to="/student/dashboard"
        replace
      />
    );
  }

  return children;
};

export default UserRoute;