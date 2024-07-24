import React, { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";
import { Box, Typography } from '@mui/material';

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <Box sx={{ px: 4,overflow: 'auto' }}>
      {!loading && messages.length > 0 && messages.map((message) => (
        <Box key={message._id} ref={lastMessageRef}>
          <Message message={message} />
        </Box>
      ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      
      {!loading && messages.length === 0 && (
        <Typography align="center" sx={{ mt: 5 }}>Send a message to start the conversation</Typography>
      )}
    </Box>
  );
};

export default Messages;
