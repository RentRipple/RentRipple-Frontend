import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

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

async function Logout() {
  try {
    await api.delete("/api/auth/logout", { refreshToken: getRefreshToken() });
  } catch (error) {
    console.log("Error logging out");
  } finally {
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/";
  }
}
// Function to fetch a new access token using the refresh token
async function fetchNewAccessToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await api.post("/api/auth/refresh-token", { refreshToken });
  setAccessToken(response.data.accessToken);
  setRefreshToken(response.data.refreshToken);
  return response.data.accessToken;
}

// Function to handle API calls with automatic token refresh
async function callApiWithRefresh(url, method = "get", data = null) {
  let accessToken = sessionStorage.getItem("accessToken");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  if (data instanceof FormData) {
    headers["Content-Type"] = "multipart/form-data";
  } else {
    headers["Content-Type"] = "application/json";
  }
  const config = {
    url,
    method,
    headers,
    data,
  };

  try {
    const response = await api(config);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      try {
        // Attempt to refresh the token
        accessToken = await fetchNewAccessToken();

        // Update the Authorization header with the new token
        config.headers.Authorization = `Bearer ${accessToken}`;

        // Retry the original request with the new token
        const response = await api(config);
        return response;
      } catch (refreshError) {
        await Logout();
        throw refreshError;
      }
    }

    await Logout();
    throw error;
  }
}

// Exporting the callApiWithRefresh function or other specific API functions
export { callApiWithRefresh };
