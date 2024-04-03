import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";
const api = axios.create({ baseURL: API_BASE_URL });

/**
 * Fetches user information using the access token.
 * @param {string} accessToken - The access token for authentication.
 * @returns {Object} The user info data.
 * @throws {Error} When the access token is not available or the request fails.
 */
export const fetchUserInfo = async (accessToken) => {
  if (!accessToken) {
    throw new Error("Access token not available.");
  }
  try {
    const response = await api.get("/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data; // Includes user info data.
  } catch (error) {
    console.error("Failed to fetch user info:", error.message);
    throw new Error("Failed to fetch user information.");
  }
};

/**
 * Logs in a user with a username and password.
 * @param {string} username - The user's username.
 * @param {string} password - The user's password.
 * @returns {Object} The user data including access and refresh tokens.
 * @throws {Error} When login fails.
 */
export const login = async (username, password) => {
  try {
    const response = await api.post("/login", { username, password });
    const { accessToken, refreshToken } = response.data;

    const userInfo = await fetchUserInfo(accessToken);
    console.log(userInfo); // Check the structure immediately after fetching

    const userData = {
      ...userInfo, // Includes userId, username, etc.
      accessToken,
      refreshToken,
    };
    console.log(userData); // Ensure the structure is correct before storage

    localStorage.setItem("user", JSON.stringify(userData));

    return userData;
  } catch (error) {
    console.error(
      "Login failed:",
      error.response?.data?.message || error.message
    );
    throw new Error("Login failed.");
  }
};
