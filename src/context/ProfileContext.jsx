// src/context/UserProfileContext.js

import axios from "axios";
import React, { createContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const ProfileContext = createContext();

const ProfileContextProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/viewUserProfile`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );

      const data = response.data

      if (data.status === 200) {
        setUserProfile(data.userProfile);
      } else {
        throw new Error("Failed to fetch user profile");
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const updateUserProfile = async (updatedProfile) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.yourdomain.com/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userProfile: updatedProfile }),
      });
      const data = await response.json();
      if (data.status === 200) {
        setUserProfile(updatedProfile);
      } else {
        throw new Error("Failed to update user profile");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        userProfile,
        fetchUserProfile,
        updateUserProfile,
        loading,
        error,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

ProfileContextProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate children as React nodes
};

export { ProfileContext, ProfileContextProvider };
