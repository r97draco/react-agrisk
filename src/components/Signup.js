import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { FormControl, FormLabel } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  validEmail,
  validPassword,
  validUsername,
  validName,
} from "../utils/Regex";
import { themeOptions } from "../utils/muiTheme";

const theme = createTheme(themeOptions);

export default function SignUp({ setStatus }) {
  const [firstNameText, setFirstNameText] = React.useState("");
  const [lastNameText, setLastNameText] = React.useState("");
  const [emailText, setEmailText] = React.useState("");
  const [dobText, setDobText] = React.useState("");
  const [usernameText, setUsernameText] = React.useState("");
  const [passwordText, setPasswordText] = React.useState("");
  const [confirmText, setConfirmText] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!validName.test(data.get("firstName"))) {
      setFirstNameText("First Name is Incorrect");
      setError(true);
    }
    if (!validName.test(data.get("lastName"))) {
      setLastNameText("Last Name is Incorrect");
      setError(true);
    }
    if (!validUsername.test(data.get("username"))) {
      setUsernameText("Username is Incorrect");
      setError(true);
    }
    if (data.get("dob") === "") {
      setDobText("Date of Birth is not filled");
      setError(true);
    }
    if (!validEmail.test(data.get("email"))) {
      setEmailText("Email is Incorrect");
      setError(true);
    }
    if (!validPassword.test(data.get("password"))) {
      setPasswordText("Password is Incorrect");
      setError(true);
    }
    if (
      data.get("password") !== data.get("confirm") &&
      !validPassword.test(data.get("confirm"))
    ) {
      setConfirmText("Password do not match.");
      setError(true);
    }
    if (!error) {
      setStatus("signin");
    }
    console.log({
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      DOB: data.get("dob"),
      username: data.get("username"),
      password: data.get("password"),
      confirm: data.get("confirm"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: 800, // Set minimum height to 100vh for full-screen height
        }}
      >
        <Container
          component="main"
          maxWidth="md"
          className="items-stretch w-full min-h-full rounded-md shadow-lg backdrop-blur-md flex-grow-1 bg-slate-100"
          sx={{
            flexGrow: 1, // Allow the container to grow and fill the available vertical space
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              py: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 2, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create your Account
            </Typography>
            <Typography component="h3" variant="h6">
              Please fill out everything.
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 6 }}
            >
              <FormControl error={error}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} lg={4}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      defaultValue="John"
                      autoFocus
                      onChange={() => {
                        setFirstNameText("");
                      }}
                    />
                    <FormHelperText>{firstNameText}</FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      defaultValue="Doe"
                      autoComplete="family-name"
                      onChange={() => {
                        setLastNameText("");
                      }}
                    />
                    <FormHelperText>{lastNameText}</FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        fullWidth
                        required
                        disableFuture
                        id="dob"
                        name="dob"
                        label="Date of Birth"
                        slotProps={{
                          textField: { fullWidth: true },
                          defaultValue: "01/01/2001",
                        }}
                        onChange={() => {
                          setDobText("");
                        }}
                      />
                      <FormHelperText>{dobText}</FormHelperText>
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} sm={6} lg={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      defaultValue="test@gmail.com"
                      autoComplete="email"
                      onChange={() => {
                        setEmailText("");
                      }}
                    />
                    <FormHelperText>{emailText}</FormHelperText>
                  </Grid>
                  <Grid item xs={12}>
                    <FormLabel error={false}>
                      Pick a Username and Password
                    </FormLabel>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="username"
                      label="Username"
                      id="username"
                      defaultValue="admin"
                      autoComplete="username"
                      onChange={() => {
                        setUsernameText("");
                      }}
                    />
                    <FormHelperText>{usernameText}</FormHelperText>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      defaultValue="react@pass1"
                      autoComplete="new-password"
                      onChange={() => {
                        setPasswordText("");
                      }}
                    />
                    <FormHelperText>{passwordText}</FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      name="confirm"
                      label="Confirm Password"
                      type="password"
                      id="confirm"
                      defaultValue="react@pass1"
                      autoComplete="new-password"
                      onChange={() => {
                        setConfirmText("");
                      }}
                    />
                    <FormHelperText>{confirmText}</FormHelperText>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create Account
                </Button>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Button onClick={() => setStatus("signin")}>
                      <RouterLink to="/">
                        <Link href="" variant="body2">
                          Already have an account? Sign in
                        </Link>
                      </RouterLink>
                    </Button>
                  </Grid>
                </Grid>
              </FormControl>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
