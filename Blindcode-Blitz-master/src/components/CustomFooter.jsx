// release v1.0 commit
import React from "react";
import "./styles/footerstyle.css";
import { Navbar, NavbarBrand } from "reactstrap";

const CustomFooter = () => {
  return (
    <Navbar color="dark" dark expand="md" fixed="bottom" className="footer">
      <NavbarBrand>
        <img
          className="footer-logo"
          src={require("../media/acmnittlogo.png")}
          alt="footer-logo"
        />
      </NavbarBrand>
      <NavbarBrand>
        <img
          className="footer-logo"
          src={require("../media/infotrek.png")}
          alt="infotrek"
        />
      </NavbarBrand>
    </Navbar>
  );
};

export default CustomFooter;
