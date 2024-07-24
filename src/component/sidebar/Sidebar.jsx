import React from "react";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import { Box, Divider, Paper } from '@mui/material';

const Sidebar = () => {
  return (
    <Paper elevation={3} sx={{ borderRight: 1, borderColor: 'grey.500', p: 2, display: 'flex', flexDirection: 'column', height: '100%', width: 300 }}>
      <SearchInput />
      <Divider sx={{ my: 2 }} />
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <Conversations />
      </Box>
      <LogoutButton />
    </Paper>
  );
};

export default Sidebar;
