import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

// Axios instance with default configuration
const api = axios.create({
  baseURL: apiUrl,
  responseType: "json",
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

// Utility function to set refresh token in local storage
function setRefreshToken(token) {
  localStorage.setItem("refreshToken", token);
}

// Function to fetch a new access token using the refresh token
async function fetchNewAccessToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await api.post("/api/auth/refresh-token", { refreshToken });
    setAccessToken(response.data.accessToken);
    setRefreshToken(response.data.refreshToken);
    return response.status; // Return status code
  } catch (error) {
    throw new Error("Failed to fetch new access");
  }
}

let isRefreshing = false;
let refreshSubscribers = [];

// Axios interceptor to handle token refreshing
api.interceptors.response.use(
  (response) => {
    // Return the response directly if successful
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, wait for new token
        try {
          const token = await new Promise((resolve) => {
            refreshSubscribers.push((newToken) => {
              resolve(newToken);
            });
          });
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await fetchNewAccessToken();
        if (response === 200) {
          const token = sessionStorage.getItem('accessToken');
          originalRequest.headers.Authorization = `Bearer ${token}`;
          refreshSubscribers.forEach(callback => callback(token));
          refreshSubscribers = [];
          return api(originalRequest);
        } else {
          // Handle refresh token failure (e.g., logout)
          return Promise.reject(error);
        }
      } catch (err) {
        // Handle refresh token error (e.g., logout)
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
