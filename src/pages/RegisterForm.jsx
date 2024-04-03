import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../auth/authSlice"; // Adjust the import path as necessary
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
import { Link } from "react-router-dom";
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
  const [selectedStarter, setSelectedStarter] = useState("bulbasaur");
  const [team, setTeam] = useState("Team Rocket");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    const value = event.target.value;
    setFormFields({ ...formFields, [prop]: value });

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
      if (allValid()) {
        try {
          const registrationData = {
            ...formFields,
            starterPokemon: selectedStarter,
            team,
          };
          await dispatch(register(registrationData)).unwrap();
          navigate("/login");
        } catch (error) {
          const message =
            error.message || "Registration failed. Please try again.";
          setServerError(message);
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

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return getFormFields(formFieldsConfig);
      case 1:
        const avatarUrl = avatars[selectedStarter];
        return (
          <FormControl fullWidth component="fieldset">
            <FormLabel component="legend">
              Choose your starter Pokemon
            </FormLabel>
            <Box sx={{ textAlign: "center", my: 2 }}>
              <Avatar
                src={avatarUrl}
                sx={{ width: 100, height: 100, margin: "auto" }}
              />
              <Typography variant="h6" sx={{ mt: 2 }}>
                {selectedStarter.charAt(0).toUpperCase() +
                  selectedStarter.slice(1)}
              </Typography>
              <Typography variant="subtitle1">Level: 5</Typography>
            </Box>
            <RadioGroup
              aria-label="starter"
              name="starter"
              value={selectedStarter}
              onChange={handleAvatarChange}
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
                      value={name}
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
                        label={`${teamKey}`}
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
                  {teamDescriptions[team]}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        );
      default:
        return "Unknown step";
    }
  };

  const allValid = () => {
    return (
      Object.values(errors).every((error) => error === "") &&
      Object.values(formFields).every((value) => value.trim() !== "")
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
            {serverError && (
              <Typography color="error">{serverError}</Typography>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
export default RegisterForm;
