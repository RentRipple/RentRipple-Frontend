import axios from "axios";
import { toast } from "react-toastify";

// eslint-disable-next-line no-undef
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const LOGIN_URL = `${BACKEND_URL}/auth/login`;

export const LoginFormSubmit = async (values) => {
  try {
    const res = await axios.post(LOGIN_URL, {
      email: values.email,
      password: values.password,
    });
    console.log("Response", res);
    console.log("responseCode", res.status); // Use status instead of data.responseCode
    // Uncomment and add your logic here based on the response
    if (res.status === 200) {
      toast.success("Logged in successfully");
      // console.log("Logged in..");

      // localStorage.setItem("token", res.data.token);
    }
    return res;
  } catch (error) {
    console.log("ERROR", error);
    console.log("response", error.response);
    console.log("Error Message", error.response.data.message);
    // Handle errors here
  }
};
