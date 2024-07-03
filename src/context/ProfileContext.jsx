import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../helpers/api';


const ProfileContext = createContext();

const ProfileContextProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/user/viewUserProfile', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
      });

      if (response.status === 200) {
        setUserProfile(response.data.userProfile);
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
      const response = await api.put('/api/user/editUserProfile', updatedProfile, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
      });

      if (response.status === 200) {
        setUserProfile(updatedProfile);
      } else {
        throw new Error('Failed to update user profile');
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
  children: PropTypes.node.isRequired,
};

export { ProfileContext, ProfileContextProvider };
