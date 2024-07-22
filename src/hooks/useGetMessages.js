import { useEffect, useState } from "react";
import useConversation from "../zustand/zustand/useConversation";
import { toast } from "react-toastify";
import { callApiWithRefresh } from "../helpers/api";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await callApiWithRefresh(`http://localhost:8000/api/chat/${selectedConversation._id}`);
				const data = res.data;
				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;
