import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";
const api = axios.create({ baseURL: API_BASE_URL });

// Axios interceptors for handling 401 Unauthorized responses and token refresh logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      originalRequest._retryCount = originalRequest._retryCount || 0;
      if (originalRequest._retryCount >= 2) {
        console.error("Max retries for token refresh reached.");
        localStorage.removeItem("user");
        return Promise.reject(error);
      }
      originalRequest._retryCount++;

      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser || !storedUser.refreshToken)
          throw new Error("No refresh token available");

        const refreshResponse = await refreshToken(storedUser.refreshToken);
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...storedUser,
            accessToken: refreshResponse.accessToken,
            refreshToken: refreshResponse.refreshToken,
          })
        );

        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${refreshResponse.accessToken}`;
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${refreshResponse.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("user");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Refresh token function
export const refreshToken = async (refreshToken) => {
  try {
    const response = await api.post("/refresh-token", { refreshToken });
    return response.data;
  } catch (error) {
    console.error("Refresh token request failed:", error);
    throw error;
  }
};

// Fetch user info using access token
export const fetchUserInfo = async (accessToken) => {
  if (!accessToken) throw new Error("Access token not available.");
  try {
    const response = await api.get("/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user info:", error.message);
    throw new Error("Failed to fetch user information.");
  }
};

// Log in a user
export const login = async (username, password) => {
  try {
    const response = await api.post("/login", {
      username, // Only username and password should be included in the request
      password,
    });
    const { accessToken, refreshToken } = response.data;

    // Optionally, fetch additional user info here if needed, using accessToken

    const userData = {
      // Assuming we're directly using the tokens from the login response
      accessToken,
      refreshToken,
    };

    // Store userData in localStorage or manage as needed
    localStorage.setItem("user", JSON.stringify(userData));

    return userData; // Return userData with tokens
  } catch (error) {
    console.error(
      "Login failed:",
      error.response?.data?.message || error.message
    );
    throw new Error("Login failed.");
  }
};

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/register", userData);
    return response.data; // Includes registration confirmation
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export default {
  refreshToken,
  fetchUserInfo,
  login,
  registerUser,
};
