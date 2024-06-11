import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

const LOGIN_URL = `${BACKEND_URL}/auth/login`;

export const LoginFormSubmit = async (values) => {
  try {
    const res = await axios.post(LOGIN_URL, {
      email: values.email,
      password: values.password,
    });
    console.log("Response", res);
    console.log("responseCode", res.data.responseCode);
    // Uncomment and add your logic here based on the response
    // if (res.data.responseCode === 200) {
    //   console.log("Logged in..");
    //   localStorage.setItem("token", res.data.result.token);
    // }
    return res;
  } catch (error) {
    console.log("ERROR", error);
    console.log("response", error.response);
    console.log("Error Message", error.response.data.responseMessage);
    // Handle errors here
  }
};
