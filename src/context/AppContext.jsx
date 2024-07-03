import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const LOGIN_URL = `${BACKEND_URL}/api/auth/login`;

// Create a Context
const AppContext = createContext();

const ContextProvider = ({ children }) => {
  // State to be shared
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate()

  const [name, setName] = useState(
    sessionStorage.getItem("name") || "",
  );

  const [accessToken, setAccessTokenState] = useState(
    sessionStorage.getItem("accessToken") || "",
  );
  const [refreshToken, setRefreshTokenState] = useState(
    localStorage.getItem("refreshToken") || "",
  );


  useEffect(() => {
    if (accessToken) {
      setIsLogin(true);
    }
  }, [accessToken]);

  // Set the access token in state and session storage
  const setAccessToken = (token) => {
    setAccessTokenState(token);
    if (token) {
      sessionStorage.setItem("accessToken", token);
    } else {
      sessionStorage.removeItem("accessToken");
    }
  };

  const setNameLocal = (name) => {
    if (name) {
      sessionStorage.setItem("name", name);
      setName(name)
    } else {
      sessionStorage.removeItem("name");
      setName(null)
    }
  };

  // Set the refresh token in state and local storage
  const setRefreshToken = (token) => {
    setRefreshTokenState(token);
    if (token) {
      localStorage.setItem("refreshToken", token);
    } else {
      localStorage.removeItem("refreshToken");
    }
  };



  const refreshTokens = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/refresh-token`,
        {
          refreshToken:localStorage.getItem("refreshToken"),
        },
      );

      if (response.status === 200) {
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
      } else {
        console.log("Response status not", response.status);
        console.log("Response", response);
      }
      return response;
    } catch (error) {

      console.error("Failed to refresh tokens:", error);
      if (error.response.status === 401) {
        console.log("Refresh token expired. Log in again.");
        handleLogout();

      }
      
    }
  };

  const handleSignUp = async (values) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/register`,
        {
          firstName: values.firstname,
          lastName: values.lastname,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          gender: values.gender,
          number: values.number,
          accountType: values.accountType,
          securityQuestions: [
            { question: values.question1, answer: values.answer1 },
            { question: values.question2, answer: values.answer2 },
            { question: values.question3, answer: values.answer3 },
          ],
        },
      );
      return res;
    } catch (error) {
       console.log("ERROR", error);
    }
  };

  const handleLogin = async (values) => {
    try {
      const res = await axios.post(LOGIN_URL, {
        email: values.email,
        password: values.password,
      });
      if (res.status === 200) {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setNameLocal(res.data.name)
        setIsLogin(true);
      } else if (res.status === 401) {
        const jwtRes = await refreshTokens();
        if (jwtRes.status === 200) {
          setAccessToken(jwtRes.data.accessToken);
          setRefreshToken(jwtRes.data.refreshToken);
          setIsLogin(true);
        } else {
          console.log("Invalid credentials");
        }
      }
      return res;
    } catch (error) {
      console.log("ERROR", error);
      return error.response
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/logout`,
        {
          data: { refreshToken },
        },
      );
      if (res.status === 204) {
        setAccessToken("");
        setRefreshToken("");
        sessionStorage.clear();
        localStorage.clear();
        setIsLogin(false);
        toast.success("Logout successful");
        navigate("/")
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const handleProtected = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/proctected`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.log("ERROR", error);
      if (error.response.status === 401) {
        const jwtRes = await refreshTokens();
        if ( jwtRes && jwtRes.status === 200) {
          setAccessToken(jwtRes.data.accessToken);
          setRefreshToken(jwtRes.data.refreshToken);
          // Retry the protected request with the new token
          await axios.get(`${process.env.REACT_APP_BACKEND_URL}/proctected`, {
            headers: {
              Authorization: `Bearer ${jwtRes.data.accessToken}`,
            },
          });
        }
      
    }
  }

  };

  return (
    <AppContext.Provider
      value={{
        name,
        isLogin,
        setIsLogin,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        refreshTokens,
        handleLogin,
        handleLogout,
        handleProtected,
        handleSignUp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Add prop types validation
ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, ContextProvider };
