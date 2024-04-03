// src/store/authActions.js

export const loginSuccess = (data) => ({
  type: "LOGIN_SUCCESS",
  payload: data,
});

export const logout = () => ({
  type: "LOGOUT",
});
