import { useState } from "react";
import useConversation from "../zustand/zustand/useConversation";
import { toast } from "react-toastify";
import { callApiWithRefresh } from "../helpers/api";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	const sendMessage = async (message) => {
		setLoading(true);
		try {
			const res = await callApiWithRefresh(`http://localhost:8000/api/chat/send/${selectedConversation._id}`,"post" , JSON.stringify({ message }));
			const data = res.data;
			if (data.error) throw new Error(data.error);

			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;
