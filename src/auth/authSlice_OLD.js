import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

// Async thunk for logging in
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        username,
        password,
      });
      const { accessToken, refreshToken } = response.data;

      // Assuming userInfo is fetched in the same login request for simplicity
      const userInfoResponse = await axios.get(`${API_BASE_URL}/userinfo`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const userInfo = userInfoResponse.data;

      // Store user data in local storage only if tokens are active
      if (accessToken && refreshToken) {
        localStorage.setItem(
          "user",
          JSON.stringify({ accessToken, refreshToken, ...userInfo })
        );
      }

      // Instead of dispatching `loginSuccess`, return the action payload directly
      return { accessToken, refreshToken, ...userInfo };
    } catch (error) {
      console.error("Login error", error);
      // Use error.message for a serializable error value
      return rejectWithValue(error.message || "Unknown login error");
    }
  }
);

// Async thunk for registering
export const register = createAsyncThunk(
  "auth/register",
  async (
    { username, email, password, starterPokemon, team },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        username,
        email,
        password,
        starterPokemon,
        team,
      });
      return response.data;
    } catch (error) {
      // Similarly, ensure the rejection value is serializable
      return rejectWithValue(error.message || "Unknown registration error");
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  userInfo: JSON.parse(localStorage.getItem("userInfo") || "null"),
  status: "idle",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("userInfo");
      state.user = null;
      state.userInfo = null;
      // If managing logged-in state, reset it here as well
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        // Directly use the action payload to update the state
        state.user = action.payload;
        state.userInfo = action.payload; // Assuming the payload includes userInfo
        state.status = "idle";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Now contains a serializable error message
      });
  },
});

// Export reducers and actions
export const { logout } = authSlice.actions;

export default authSlice.reducer;
