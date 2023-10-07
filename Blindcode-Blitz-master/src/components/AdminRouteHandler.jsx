// release v1.0 commit
import { Navigate, Outlet, Route } from "react-router-dom";
import { getCurrentUserProfile, isLoggedIn } from "../auth/auth";

const AdminRouteHandler = () => {
  if (isLoggedIn) {
    let hasRoleAdmin = getCurrentUserProfile() == "ROLE_ADMIN";
    if (hasRoleAdmin) {
      return <Outlet></Outlet>;
    }
  } else return <Navigate to="/" />;
};

export default AdminRouteHandler;
