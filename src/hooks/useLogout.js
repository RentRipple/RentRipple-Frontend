import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { handleLogout } = useContext(AppContext);

	const logout = async () => {
		setLoading(true);
		try {
			handleLogout();
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, logout };
};
export default useLogout;
