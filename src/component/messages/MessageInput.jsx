import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import { TextField, IconButton, CircularProgress, Box } from '@mui/material';

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '0 0 0 16px'}}>
      <Box sx={{ width: '100%', position: 'relative' }}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'grey.700',
              },
              '&:hover fieldset': {
                borderColor: 'grey.500',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
              },
              bgcolor: 'white.700',
              color: 'black'
            }
          }}
        />
        <IconButton
          type="submit"
          sx={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)' }}
        >
          {loading ? <CircularProgress size={24} /> : <BsSend />}
        </IconButton>
      </Box>
    </form>
  );
};

export default MessageInput;
