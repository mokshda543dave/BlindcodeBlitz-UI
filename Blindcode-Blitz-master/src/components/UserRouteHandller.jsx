// release v1.0 commit
import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getCurrentUserProfile, isLoggedIn } from "../auth/auth";

const UserRouteHandller = () => {
  const navigate = useNavigate();
  if (isLoggedIn) {
    let hasRoleUser = getCurrentUserProfile() == "ROLE_NORMAL";
    if (hasRoleUser) {
      return <Outlet></Outlet>;
    }
  } else navigate("/login");
};

export default UserRouteHandller;
