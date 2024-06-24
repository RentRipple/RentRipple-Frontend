import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AppContext } from "../context/AppContext";

export default function AuthGuard(props) {
  const { children } = props;
  const { isLogin } = useContext(AppContext);

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

AuthGuard.propTypes = {
  children: PropTypes.node.isRequired,
};
