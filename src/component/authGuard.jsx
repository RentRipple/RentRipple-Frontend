import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

export default function AuthGuard(props) {
  const { children } = props;
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    setAuth(!!window.localStorage.getItem("token"));
  }, []);

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

AuthGuard.propTypes = {
  children: PropTypes.node.isRequired
};
