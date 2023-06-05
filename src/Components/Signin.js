import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { validPassword, validUsername } from "../Utils/Regex";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";
import { themeOptions } from "../Utils/MuiTheme";
import { useAuth } from "../Utils/Auth";

const theme = createTheme(themeOptions);

/**
 * SignIn component displays the sign-in form.
 * @component
 *
 * @param {Object} props - The properties passed to the component
 * @param {Function} props.setStatus - The function to set the status
 * @param {Function} props.setLoggedIn - The function to set the logged-in state
 *
 * @returns {JSX.Element} SignIn component
 */
export default function SignIn({ setStatus, setLoggedIn }) {
  const [radioText, setRadioText] = React.useState("");
  const [usernameText, setUsernameText] = React.useState("");
  const [passwordText, setPasswordText] = React.useState("");
  const [radio, setRadio] = React.useState("admin");
  const [error, setError] = React.useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const redirectPath = location.state?.path || "/home/";

  const handleRadioChange = (event) => {
    setRadio(event.target.value);
    setRadioText("");
  };
  const handleCreateAccount = () => {
    setStatus("signup");
    navigate("/signup");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let er = false;
    const data = new FormData(event.currentTarget);
    if (radio === "") {
      setRadioText("Select User or Administrator");
      er = true;
    }
    if (!validUsername.test(data.get("username"))) {
      setUsernameText("Username is Incorrect");
      er = true;
    }
    if (!validPassword.test(data.get("password"))) {
      setPasswordText("Password is Incorrect");
      er = true;
    }
    if (er) setError(true);
    console.log({
      username: data.get("username"),
      password: data.get("password"),
      person: data.get("person"),
      required: data.get("required"),
      error: er,
    });
    if (
      validPassword.test(data.get("password")) &&
      validUsername.test(data.get("username"))
    ) {
      setLoggedIn(true);
      auth.login(data.get("username"));
      navigate(redirectPath, { replace: true });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div sx={{ width: 100 }}>
        <Box
          sx={{
            display: "flex",
            p: 1,
            borderRadius: 1,
          }}
          className="items-center"
        >
          <Grid container spacing={2} className="items-stretch items-center">
            <Grid className="hidden md:block" item md>
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  flexDirection: "column",
                }}
                className="items-center content-center justify-center rounded-md shadow-lg bg-slate-100"
              >
                <Box
                  sx={{ p: 1, mb: 1, maxWidth: 800 }}
                  className="w-full rounded-md bg-slate-100"
                >
                  <img
                    src="./combine.png"
                    alt="map-pic"
                    style={{ width: "auto", height: "auto" }}
                  />
                </Box>
                <Box
                  sx={{ p: 1, maxWidth: 800 }}
                  className="object-contain w-full rounded-md bg-slate-100"
                >
                  <img
                    src="./map1.jpg"
                    alt="map-pic"
                    style={{ width: 800, height: "auto" }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item sm>
              <Box className="w-full min-h-full rounded-md shadow-lg bg-slate-100">
                <Container component="main" maxWidth="sm">
                  <CssBaseline />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      pt: 6,
                    }}
                  >
                    <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Sign in
                    </Typography>

                    <Box
                      component="form"
                      onSubmit={handleSubmit}
                      sx={{ mt: 6 }}
                      noValidate
                      alignContent="center"
                      justifyContent="center"
                    >
                      <FormControl error={error}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              row
                              name="person"
                              onChange={handleRadioChange}
                              defaultValue="administrator"
                            >
                              <Grid container>
                                <Grid item xs>
                                  <FormControlLabel
                                    value="user"
                                    control={<Radio />}
                                    label="User"
                                  />
                                </Grid>
                                <Grid item>
                                  <FormControlLabel
                                    value="administrator"
                                    control={<Radio />}
                                    defaultChecked
                                    label="Administrator"
                                  />
                                </Grid>
                              </Grid>
                            </RadioGroup>
                          </Grid>
                          <FormHelperText>{radioText}</FormHelperText>

                          <Grid item xs={12}>
                            <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="username"
                              label="Username"
                              name="username"
                              autoComplete="username"
                              defaultValue="admin"
                              autoFocus
                              onChange={(e) => {
                                setUsernameText("");
                                setError(false);
                              }}
                            />
                            <FormHelperText>{usernameText}</FormHelperText>
                          </Grid>

                          <Grid item xs={12}>
                            <TextField
                              margin="normal"
                              required
                              fullWidth
                              name="password"
                              label="Password"
                              type="password"
                              defaultValue="react@pass1"
                              id="password"
                              autoComplete="current-password"
                              onChange={() => {
                                setPasswordText("");
                                setError(false);
                              }}
                            />
                            <FormHelperText>{passwordText}</FormHelperText>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  defaultChecked
                                  value="remember"
                                  color="primary"
                                />
                              }
                              label="Remember me"
                              name="required"
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <Button
                              type="submit"
                              className="w-full"
                              variant="contained"
                              sx={{ mt: 3, mb: 2 }}
                              // onClick={handleLogin}
                            >
                              Sign In
                            </Button>
                          </Grid>

                          <Grid item xs={12}>
                            <Grid container>
                              <Grid item xs>
                                <Link href="#" variant="body2">
                                  Forgot password?
                                </Link>
                              </Grid>
                              <Grid item>
                                <Link href="#" variant="body2">
                                  Forgot username?
                                </Link>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            className="flex items-center justify-center w-full p-0 m-0"
                          >
                            <Button
                              onClick={handleCreateAccount}
                              variant="text"
                            >
                              Don't have an account? Sign Up
                            </Button>
                          </Grid>
                        </Grid>
                      </FormControl>
                    </Box>
                  </Box>
                </Container>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </ThemeProvider>
  );
}
