import { useContext, useEffect } from "react";
import useConversation from "../../zustand/zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import React from "react";
import { AppContext } from "../../context/AppContext";
import { Box, Avatar, Typography, Paper } from '@mui/material';

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '100%' }}>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <Paper elevation={2} sx={{px: 4, py: 2, }} style={{backgroundColor: "#333", marginLeft: "16px", marginRight: "0px", display: "flex", gap: "16px"}}>
          <Avatar
          src={selectedConversation.profilePic}
          alt="user avatar"
          sx={{ width: 34, height: 34}}
        />
            <Typography variant="h6" style={{color: "#fff"}} fontWeight="bold">
              {selectedConversation.firstName}
            </Typography>
          </Paper>
          <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
            <Messages />
            <MessageInput />
          </Box>
          
        </>
      )}
    </Box>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const { name } = useContext(AppContext);
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1, background: '#333' }}>
      <Box sx={{ px: 4, textAlign: 'center', typography: { sm: 'body1', md: 'h6' }, color: 'grey.200', fontWeight: 'fontWeightBold', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Typography>Welcome 👋 {name} ❄</Typography>
        <Typography>Select a chat to start messaging</Typography>
        <TiMessages className='text-3xl md:text-6xl text-center' />
      </Box>
    </Box>
  );
};
