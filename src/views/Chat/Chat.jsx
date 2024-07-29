import React from "react";
import Sidebar from "../../component/sidebar/Sidebar";
import MessageContainer from "../../component/messages/MessageContainer";
import { Box, Paper } from '@mui/material';

const Chat = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', borderRadius: 2, overflow: 'hidden', backdropFilter: 'blur(10px)'}}>
      <Paper elevation={3} sx={{ display: 'flex', width: '100%', 
        backgroundColor: "#E7EDF2", padding: "1px" 
        }}>
        <Sidebar />
        <MessageContainer />
      </Paper>
    </Box>
  );
};

export default Chat;
