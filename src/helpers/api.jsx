import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

// Axios instance with default configuration
const api = axios.create({
  baseURL: apiUrl,
  timeout: 10000, // Timeout of 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Utility function to get refresh token from session storage
function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

// Utility function to set access token in session storage
function setAccessToken(token) {
  sessionStorage.setItem("accessToken", token);
}

// Function to fetch a new access token using the refresh token
async function fetchNewAccessToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await api.post("/api/auth/refresh-token", {
    refreshToken,
  });
  setAccessToken(response.data.accessToken);
  return response.data.accessToken;
}

// Axios interceptor to handle token refreshing
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      originalRequest._retry = true;
      const accessToken = await fetchNewAccessToken();
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default api;
