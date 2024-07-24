import React from "react";
import Sidebar from "../../component/sidebar/Sidebar";
import MessageContainer from "../../component/messages/MessageContainer";
import { Box, Paper } from '@mui/material';

const Chat = () => {
  return (
    <Box sx={{ display: 'flex', height: { sm: 450, md: 550 }, borderRadius: 1, overflow: 'hidden', backdropFilter: 'blur(10px)', bgcolor: 'rgba(255, 255, 255, 0.5)' }}>
      <Paper elevation={3} sx={{ display: 'flex', width: '100%' }}>
        <Sidebar />
        <MessageContainer />
      </Paper>
    </Box>
  );
};

export default Chat;
