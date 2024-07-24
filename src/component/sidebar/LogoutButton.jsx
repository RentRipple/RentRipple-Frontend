import React from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { Box, IconButton, CircularProgress } from '@mui/material';

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <Box sx={{ mt: 'auto' }}>
      {!loading ? (
        <IconButton onClick={logout} color="primary">
          <BiLogOut style={{ width: '24px', height: '24px', color: 'white' }} />
        </IconButton>
      ) : (
        <CircularProgress size={24} sx={{ color: 'primary.main' }} />
      )}
    </Box>
  );
};

export default LogoutButton;
