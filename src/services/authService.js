// src/services/authService.js
import client from "../api/client"; // Assuming you've set up an Axios client as discussed

const login = async (username, password) => {
  const response = await client.post("/login", { username, password });
  const { userId, token } = response.data;
  localStorage.setItem("token", token); // Consider managing the token more securely/centrally
  return { userId, token };
};

export default { login };
