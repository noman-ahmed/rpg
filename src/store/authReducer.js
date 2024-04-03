// src/store/authReducer.js

// Helper function to safely parse values from localStorage
function safelyParseJSON(value) {
  try {
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.error("Parsing error on", { value });
    return null;
  }
}

const initialState = {
  isLoggedIn: safelyParseJSON(localStorage.getItem("isLoggedIn")) || false,
  accessToken: localStorage.getItem("accessToken") || null, // Assuming it's always a string or null
  user: safelyParseJSON(localStorage.getItem("user")) || null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("user", JSON.stringify(action.payload.user));

      return {
        ...state,
        isLoggedIn: true,
        accessToken: action.payload.accessToken,
        user: action.payload.user,
      };
    case "LOGOUT":
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      return {
        ...state,
        isLoggedIn: false,
        accessToken: null,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
