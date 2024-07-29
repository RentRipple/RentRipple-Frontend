import React, { useContext } from "react";
import PropTypes from 'prop-types';
import { extractTime } from "../../utils/utils/extractTime";
import { AppContext } from "../../context/AppContext";
// import { Box, Avatar, Typography } from '@mui/material';
import { Box, Typography } from '@mui/material';

const Message = ({ message }) => {
  const { userId } = useContext(AppContext);
  const fromMe = message.senderId === userId;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "flex-end" : "flex-start";
  // const profilePic = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/440px-User_icon_2.svg.png";
  const bubbleBgColor = fromMe ? "rgb(34, 83, 141, 0.8)" : "rgb(34, 83, 141)";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: chatClassName, mb: 2 }}>
      {/* <Avatar src={profilePic} alt='User avatar' sx={{ width: 40, height: 40, mb: 1 }} /> */}
      <Box sx={{ 
        bgcolor: bubbleBgColor, 
        color: 'white', 
        borderRadius: 1, 
        p: 1, 
        maxWidth: '70%', 
        wordWrap: 'break-word', 
        alignSelf: chatClassName,
        animation: shakeClass ? 'shake 0.5s' : 'none'
      }}
      style={{display: "flex"}}>
        <Typography variant="body2">{message.message}</Typography>
        <Typography variant="caption" sx={{ color: '#fff', opacity: "0.5" , alignSelf: chatClassName }} style={{paddingLeft: "20px", paddingTop:" 5px"}}>
        {formattedTime}
      </Typography>
      </Box>
      
    </Box>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    senderId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    shouldShake: PropTypes.bool,
    message: PropTypes.string.isRequired
  }).isRequired
};

export default Message;
