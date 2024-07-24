import { useContext, useEffect } from "react";
import useConversation from "../../zustand/zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import React from "react";
import { AppContext } from "../../context/AppContext";
import { Box, Typography, Paper } from '@mui/material';

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <Box sx={{ minWidth: { md: 450 }, display: 'flex', flexDirection: 'column', height: '100%' }}>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <Paper elevation={3} sx={{ bgcolor: 'primary.main', px: 4, py: 2, mb: 2 }}>
            <Typography variant="body1" color="text.secondary">To:</Typography>
            <Typography variant="h6" color="text.primary" fontWeight="bold">
              {selectedConversation.firstName}
            </Typography>
          </Paper>
          <Messages />
          <MessageInput />
        </>
      )}
    </Box>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const { name } = useContext(AppContext);
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
      <Box sx={{ px: 4, textAlign: 'center', typography: { sm: 'body1', md: 'h6' }, color: 'grey.200', fontWeight: 'fontWeightBold', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Typography>Welcome 👋 {name} ❄</Typography>
        <Typography>Select a chat to start messaging</Typography>
        <TiMessages className='text-3xl md:text-6xl text-center' />
      </Box>
    </Box>
  );
};
