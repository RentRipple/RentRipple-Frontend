import React from "react";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import { Box, Divider } from '@mui/material';

const Sidebar = () => {
  return (
    <Box component="div" sx={{ pr: 1, display: 'flex', flexDirection: 'column', height: '100%', width: 300 }}>
      <SearchInput />
      <Divider sx={{ my: 2 }} />
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <Conversations />
      </Box>
      <LogoutButton />
    </Box>
  );
};

export default Sidebar;
