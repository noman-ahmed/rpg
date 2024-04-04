import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Link as MuiLink,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthDispatch, loginUser } from "../contexts/AuthContext"; // Adjust the import path as needed

function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [registrationSuccessMessage, setRegistrationSuccessMessage] =
    useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAuthDispatch(); // Use context's dispatch function

  useEffect(() => {
    // Check if redirected from RegisterForm with success state
    if (location.state?.registrationSuccess) {
      setRegistrationSuccessMessage(
        "Your account was created successfully! Login to continue."
      );
      // Clear the state so the message doesn't reappear on refresh
      history.replaceState({}, "");
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await loginUser(dispatch, {
        username: form.username,
        password: form.password,
      });
      navigate("/dashboard");
    } catch (error) {
      const errorMessage = error.message || "Login failed. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        textAlign: "center",
      }}
    >
      <Paper elevation={0} variant="outlined" sx={{ p: 4 }}>
        {registrationSuccessMessage && (
          <Typography color="green" sx={{ mb: 2, fontWeight: "500" }}>
            {registrationSuccessMessage}
          </Typography>
        )}
        <TextField
          error={!!error}
          helperText={error || " "}
          label="Username"
          name="username"
          variant="outlined"
          fullWidth
          value={form.username}
          onChange={handleChange}
        />
        <TextField
          error={!!error}
          helperText={error || " "}
          label="Password"
          name="password"
          variant="outlined"
          type="password"
          fullWidth
          value={form.password}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2, mb: 2 }}>
          Login
        </Button>
        <Typography variant="body2">
          Don't have an account?{" "}
          <MuiLink component={Link} to="/register" underline="hover">
            Sign Up Now
          </MuiLink>
        </Typography>
      </Paper>
    </Box>
  );
}

export default LoginForm;
