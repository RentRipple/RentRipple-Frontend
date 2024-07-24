import React, { useContext } from "react";
import PropTypes from 'prop-types';
import { extractTime } from "../../utils/utils/extractTime";
import { AppContext } from "../../context/AppContext";

const Message = ({ message }) => {
	const { userId } = useContext(AppContext);
	const fromMe = message.senderId === userId;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/440px-User_icon_2.svg.png"
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";
	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
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
