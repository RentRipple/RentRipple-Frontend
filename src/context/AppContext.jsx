import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const LOGIN_URL = `${BACKEND_URL}/api/auth/login`;

// Create a Context
const AppContext = createContext();

const ContextProvider = ({ children }) => {
  // State to be shared
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessTokenState] = useState(sessionStorage.getItem('accessToken') || '');
  const [refreshToken, setRefreshTokenState] = useState(localStorage.getItem('refreshToken') || '');


  useEffect(() => {
    if(accessToken){
      setIsLogin(true);
    }
  }, [accessToken]);

  // Set the access token in state and session storage
  const setAccessToken = (token) => {
    setAccessTokenState(token);
    if (token) {
      sessionStorage.setItem('accessToken', token);
    } else {
      sessionStorage.removeItem('accessToken');
    }
  };

  // Set the refresh token in state and local storage
  const setRefreshToken = (token) => {
    setRefreshTokenState(token);
    if (token) {
      localStorage.setItem('refreshToken', token);
    } else {
      localStorage.removeItem('refreshToken');
    }
  };

  const refreshTokens = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/refresh-token`,
        {
          refreshToken,
        },
      );
      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
      } else {
        handleLogout();
      }
      return response;
    } catch (error) {
      console.error('Failed to refresh tokens:', error);
      handleLogout();
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
        setIsLogin(true);
      }
      else if (res.status === 401) {
        const jwtRes = await refreshTokens();
        if (jwtRes.status === 200) {
          setAccessToken(jwtRes.data.accessToken);
          setRefreshToken(jwtRes.data.refreshToken);
          setIsLogin(true);
        }else{
          console.log("Invalid credentials");
        }
      }
      return res;
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const handleLogout = () => {
    setAccessToken('');
    setRefreshToken('');
    setIsLogin(false);
    toast.success('Logout successful');
  };

  const handleProtected = async () => { 
    try {
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/proctected`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
    catch (error) {
      console.log("ERROR", error);
        if(error.response.status == 401){
        const jwtRes = await refreshTokens();
        if (jwtRes.status === 200) {
          setAccessToken(jwtRes.data.accessToken);
          setRefreshToken(jwtRes.data.refreshToken);
        }
      }
      else{
        console.log("Protected route accessed");
      
      }
    }
  }

  return (
    <AppContext.Provider value={{ isLogin, setIsLogin, accessToken, setAccessToken, refreshToken, setRefreshToken, refreshTokens , handleLogin, handleLogout,handleProtected}}>
      {children}
    </AppContext.Provider>
  );
};

// Add prop types validation
ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, ContextProvider };
