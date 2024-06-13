import React from "react";
import logo from "../assets/TransparentLogo.svg";

const Logo = () => {
  return (
    <img
      src={logo}
      alt="Logo"
      style={{ height: "70px", borderRadius: "100%" }}
    />
  );
};

export default Logo;
