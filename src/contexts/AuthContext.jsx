import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";

// Define the base URL for all API calls
const API_BASE_URL = "http://localhost:3001/api";

// Create context objects
const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

// Helper function for safely parsing JSON from localStorage
const safelyParseJSON = (value) => {
  try {
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.error("Parsing error on", { value });
    return null;
  }
};

// Define the initial state for context
const initialState = {
  isLoggedIn: safelyParseJSON(localStorage.getItem("isLoggedIn")) || false,
  accessToken: localStorage.getItem("accessToken") || null,
  userInfo: safelyParseJSON(localStorage.getItem("userInfo")) || null,
};

// Reducer function to manage state updates
const actionTypes = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT: "LOGOUT",
  SET_USER_INFO: "SET_USER_INFO",
};

const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      localStorage.setItem("accessToken", action.payload.accessToken);
      return {
        ...state,
        isLoggedIn: true,
        accessToken: action.payload.accessToken,
      };
    case actionTypes.LOGOUT:
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userInfo");
      return {
        ...state,
        isLoggedIn: false,
        accessToken: null,
        userInfo: null,
      };
    case actionTypes.SET_USER_INFO:
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};

// Context provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

// Hooks for using context
export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);

// Authentication-related actions
export const loginUser = async (dispatch, { username, password }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password,
    });
    const { accessToken } = response.data;

    if (accessToken) {
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      localStorage.setItem("accessToken", accessToken); // Confirm this is executed
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: { accessToken },
      });
      fetchUserInfo(dispatch); // Fetch user info
    } else {
      console.error("No access token received");
    }
    return response.data;
  } catch (error) {
    console.error("Login error", error);
    throw error;
  }
};

export const logoutUser = (dispatch) => {
  dispatch({ type: actionTypes.LOGOUT });
};

export const registerUser = async (dispatch, registrationData) => {
  try {
    await axios.post(`${API_BASE_URL}/register`, registrationData);
    // Registration-specific logic or UI handling can go here.
    // For example, showing a success message or redirecting to the login page.
  } catch (error) {
    console.error(
      "Registration error",
      error.response ? error.response.data : error
    );
    throw error; // Re-throw the error for handling at the UI level, such as form error messages.
  }
};

export const fetchUserInfo = async (dispatch) => {
  // Retrieve the access token from local storage
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    console.error("Access token not found in local storage.");
    return;
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/userinfo`, {
      headers: {
        // Properly include the token in the Authorization header
        Authorization: `Bearer ${accessToken}`,
      },
    });

    dispatch({ type: actionTypes.SET_USER_INFO, payload: response.data });
  } catch (error) {
    console.error(
      "Fetch userInfo error",
      error.response ? error.response.data : error
    );
    // Optionally, handle specific error scenarios here, e.g., token expiration
  }
};
