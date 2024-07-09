import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { callApiWithRefresh } from '../helpers/api';


const ProfileContext = createContext();

const ProfileContextProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const response = await callApiWithRefresh("/api/user/viewUserProfile");

      if (response.status === 200) {
        setUserProfile(response.data.userProfile.UserDetails);
      } else {
        throw new Error('Failed to fetch user profile');
      }
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (updatedProfile) => {
    setLoading(true);
    try {
      const response = await callApiWithRefresh('/api/user/editUserProfile',"post", updatedProfile);
      if (response.status === 200) {
        setUserProfile(null);
        fetchUserProfile();
        return true;
      } else {
        throw new Error('Failed to update user profile');
      }
    } catch (err) {
      setError(err.message);
      return false;
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
  children: PropTypes.node.isRequired,
};

export { ProfileContext, ProfileContextProvider };
