import React, { useState } from "react";
import axios from "axios";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Avatar,
  Grid,
  Link as MuiLink,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  steps,
  formFieldsConfig,
  teamDescriptions,
  avatars,
} from "../contexts/constants.jsx";
import { validateEmail, validatePassword } from "../contexts/validators.jsx";

function RegisterForm() {
  let theme = createTheme({
    palette: {
      primary: {
        main: "#ea80fc",
      },
    },
  });

  theme = responsiveFontSizes(theme);

  const [activeStep, setActiveStep] = useState(0);
  const [formFields, setFormFields] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Set the first avatar as the default selected value
  const [selectedStarter, setSelectedStarter] = useState("bulbasaur"); // Use Pokémon name as initial state
  const [team, setTeam] = useState("Team Rocket");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    const value = event.target.value;
    setFormFields({ ...formFields, [prop]: value });

    // Reset errors
    let newErrors = { ...errors, [prop]: "" };

    if (prop === "email" && !validateEmail(value)) {
      newErrors[prop] = "Email is invalid";
    } else if (prop === "password" && !validatePassword(value)) {
      newErrors[prop] = "Password doesn't meet requirements";
    } else if (prop === "confirmPassword" && formFields.password !== value) {
      newErrors["confirmPassword"] = "Passwords don't match";
    }

    setErrors(newErrors);
  };

  const handleNext = async () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      // Assuming this is the last step - attempt to register
      if (allValid()) {
        // Make sure all validations passed
        try {
          const registrationData = {
            ...formFields,
            starterPokemon: selectedStarter,
            team,
          };
          await axios.post(
            "http://localhost:3001/api/register",
            registrationData
          );
          navigate("/login"); // Redirect on success
        } catch (error) {
          console.error(
            "Registration error:",
            error.response?.data || error.message
          );
          // Handle server-side errors (e.g., username taken) here
          setErrors({
            ...errors,
            general: "Registration failed. Please try again.",
          });
        }
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAvatarChange = (event) => {
    setSelectedStarter(event.target.value);
  };

  const handleTeamChange = (event) => {
    setTeam(event.target.value);
  };

  const getFormFields = (fields) => {
    return fields.map(({ id, label, type }) => (
      <TextField
        key={id}
        id={id}
        label={label}
        type={type}
        fullWidth
        margin="normal"
        value={formFields[id]}
        onChange={handleChange(id)}
        error={!!errors[id]}
        helperText={errors[id]}
      />
    ));
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return getFormFields(formFieldsConfig);
      case 1:
        // Find the URL of the currently selected avatar for display
        const avatarUrl = avatars[selectedStarter]; // Use selectedStarter to get the avatar URL
        return (
          <FormControl fullWidth component="fieldset">
            <FormLabel component="legend">
              Choose your starter Pokemon
            </FormLabel>
            {/* Display selected Pokémon image, name, and level */}
            <Box sx={{ textAlign: "center", my: 2 }}>
              <Avatar
                src={avatarUrl} // Use the URL from the avatars object
                sx={{ width: 100, height: 100, margin: "auto" }}
              />
              <Typography variant="h6" sx={{ mt: 2 }}>
                {selectedStarter.charAt(0).toUpperCase() +
                  selectedStarter.slice(1)}
                {/* Capitalize the name */}
              </Typography>
              <Typography variant="subtitle1">Level: 5</Typography>
            </Box>
            <RadioGroup
              aria-label="starter"
              name="starter"
              value={selectedStarter} // Use selectedStarter here for value
              onChange={handleAvatarChange}
              row={false}
            >
              <Grid container sx={{ textAlign: "center" }}>
                {Object.entries(avatars).map(([name, url]) => (
                  <Grid
                    item
                    xs={4}
                    key={name}
                    sx={{ borderTop: "1px solid rgba(0, 0, 0, 0.12)", p: 4 }}
                  >
                    <FormControlLabel
                      value={name} // Use the Pokémon name as the value for the radio button
                      control={<Radio />}
                      label={
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Avatar
                            sx={{ width: 64, height: 64, margin: "auto" }}
                            src={url}
                            alt={name}
                          />
                          <Typography variant="caption" sx={{ mt: 1 }}>
                            {name.charAt(0).toUpperCase() + name.slice(1)}
                            {/* Capitalize the name */}
                          </Typography>
                        </Box>
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          </FormControl>
        );
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Join a team</FormLabel>
                <RadioGroup
                  aria-label="team"
                  name="team"
                  value={team}
                  onChange={handleTeamChange}
                >
                  {Object.entries(teamDescriptions).map(
                    ([teamKey, description]) => (
                      <FormControlLabel
                        key={teamKey}
                        value={teamKey}
                        control={<Radio />}
                        label={`${teamKey}`} // Simplified label
                      />
                    )
                  )}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  minHeight: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="body1" sx={{ textAlign: "center" }}>
                  {teamDescriptions[team]}{" "}
                  {/* Display the description of the selected team */}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        );
      default:
        return "Unknown step";
    }
  }

  const allValid = () => {
    // Validate that no error messages are present and all fields are filled for the first step
    return (
      Object.values(errors).every((error) => error === "") &&
      (activeStep !== 0 ||
        Object.values(formFields).every((value) => value.trim() !== ""))
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: { xs: "100%", md: "50%" },
        mx: "auto",
      }}
    >
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{ width: "100%", mb: 2 }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{ p: { xs: 2, sm: 3 }, mt: 2, width: "100%" }}
      >
        {getStepContent(activeStep)}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: theme.spacing(2),
            mt: theme.spacing(2),
            width: "100%",
          }}
        >
          <Typography variant="body2">
            Already have an account?{" "}
            <MuiLink component={Link} to="/login" underline="hover">
              Login Now
            </MuiLink>
          </Typography>
          <Box>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ textTransform: "none" }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!allValid()}
              sx={{ textTransform: "none", color: "#fff", ml: 1 }}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
export default RegisterForm;
