import React from 'react';
import PropTypes from 'prop-types';
import { useSocketContext } from "../../context/ChatContext";
import useConversation from "../../zustand/zustand/useConversation";
import { Box, Avatar, Typography, Divider } from '@mui/material';

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          bgcolor: isSelected ? 'primary.main' : 'transparent',
          color: isSelected ? 'whitesmoke' : 'text.primary',
          '&:hover': {
            bgcolor: "#fff",
            color: "black",
          },
          borderRadius: 1,
          p: 1,
          cursor: 'pointer'
        }}
        onClick={() => setSelectedConversation(conversation)}
      >
        <Avatar
          src={conversation.profilePic}
          alt="user avatar"
          sx={{ width: 48, height: 48, bgcolor: isOnline ? 'success.main' : 'grey.500' }}
        />
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1" fontWeight="bold" >
              {conversation.firstName}
            </Typography>
            <Typography variant="h6">
              {emoji}
            </Typography>
          </Box>
        </Box>
      </Box>
      {!lastIdx && <Divider sx={{ my: 1 }} />}
    </>
  );
};

Conversation.propTypes = {
  conversation: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    profilePic: PropTypes.string,
    firstName: PropTypes.string,
  }).isRequired,
  lastIdx: PropTypes.bool,
  emoji: PropTypes.string,
};

export default Conversation;
