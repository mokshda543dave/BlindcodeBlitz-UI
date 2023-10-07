// release v1.0 commit
import React from "react";
import "./styles/navbarstyle.css";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink as ReactLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import {
  doLogout,
  getCurrentUser,
  getCurrentUserProfile,
  isLoggedIn,
} from "../auth/auth";
import { toast } from "react-toastify";

const CustomNavbar = () => {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);
  const [stats, setStats] = useState(false);
  // eslint-disable-next-line
  const [userProfile, setUserProfile] = useState(false);

  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrentUser());
    setUserProfile(getCurrentUserProfile() === "ROLE_ADMIN");
    setStats(localStorage.getItem("status") != null);
  }, [login, stats]);

  // eslint-disable-next-line
  const performLogout = () => {
    doLogout(() => {
      toast.info("Logged out successfully.");
    });
  };

  return (
    <div>
      <Navbar color="dark" dark expand="md" fixed="top" className="header">
        <NavbarBrand className="header-brand-logo-container">
          <img
            className="header-logo"
            alt="blindcode-logo"
            src={require("../media/faviconz.ico.png")}
          />
          <img
            className="header-logo"
            id="header-logo-txt"
            alt="text-logo"
            src={require("../media/blindcode-logo-txt.png")}
          />
        </NavbarBrand>
        <NavbarToggler />
        <Collapse navbar>
          <Nav className="me-auto" navbar></Nav>
          <Nav navbar>
            {login && (
              <>
                <NavItem>
                  <NavLink>{user.email}</NavLink>
                </NavItem>
              </>
            )}

            {!login && (
              <>
                <NavItem>
                  <NavLink
                    tag={ReactLink}
                    to="/login"
                    disabled={
                      stats &&
                      JSON.parse(localStorage.getItem("status"))[0].status === 0
                    }
                  >
                    <span className="navlink-text">LOGIN</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={ReactLink}
                    to="/register"
                    disabled={
                      stats &&
                      JSON.parse(localStorage.getItem("status"))[1].status === 0
                    }
                  >
                    <span className="navlink-text">REGISTER</span>
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
