import React from 'react';
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/utils/emojis";
import Conversation from "./Conversation";
import { Box, CircularProgress } from '@mui/material';

const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <Box sx={{ py: 0, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
        />
      ))}

      {loading ? <CircularProgress sx={{ alignSelf: 'center', mt: 2 }} /> : null}
    </Box>
  );
};

export default Conversations;
