import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { callApiWithRefresh } from "../helpers/api";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  
  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await callApiWithRefresh("http://localhost:8000/api/user/viewAllUsers");
        if(res.status != 200) {
			toast.error("Error in fetching conversations",res.status);
		}
        const data = res.data;
		console.log(data);
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
