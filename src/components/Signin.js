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
import { ThemeOptions } from '@mui/material/styles';
import { validEmail, validPassword, validUsername } from "../Regex";
import { Route, Link as RouterLink, useNavigate } from "react-router-dom";
import "../App.css";
import { themeOptions } from "../utils/muiTheme";


function Copyright(props) {
  return (
    <>
      <Typography variant="body1" color="text.primary" align="center">
        {"Copyright © "} {new Date().getFullYear()}
        {" GARS / "}
        <Link color="inherit" href="https://parametrics.ag/">
          Parametrics.ag
        </Link>
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        All rights reserved | Privacy Policy
      </Typography>
    </>
  );
}


const theme = createTheme(themeOptions);

export default function SignIn({ setStatus, setLoggedIn }) {
  const [radioText, setRadioText] = React.useState("");
  const [usernameText, setUsernameText] = React.useState("");
  const [passwordText, setPasswordText] = React.useState("");
  const [radio, setRadio] = React.useState("admin");
  const [error, setError] = React.useState(false);

  const navigate = useNavigate();
  const handleRadioChange = (event) => {
    setRadio(event.target.value);
    setRadioText("");
  };
  const handleCreateAccount = () => {
    setStatus("signup")
    navigate("/signup");
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    let er= false;
    const data = new FormData(event.currentTarget);
    console.log("pass---", data.get("password"),"---Validation-",validPassword.test(data.get("password")))
    if (radio === "") {
      setRadioText("Select User or Administrator");
      er=true;
    } 
    if (!validUsername.test(data.get("username"))) {
      setUsernameText("Username is Incorrect");
      er=true;
    }  
    if (!validPassword.test(data.get("password"))) {
      setPasswordText("Password is Incorrect");
      er=true;
    }
    if(er)setError(true);
    console.log({
      username: data.get("username"),
      password: data.get("password"),
      person: data.get("person"),
      required: data.get("required"),
      error: error,
    });
    if (validPassword.test(data.get("password")) && validUsername.test(data.get("username"))) {
      const timeout = setTimeout(() => {
        navigate("/home");
        console.log('Timeout logic executed');
      }, 1);
      setLoggedIn(true);

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
                className="items-center content-center justify-center rounded-md"
              >
                <Box
                  fullWidth
                  sx={{ p: 1, mb: 1, maxWidth: 800 }}
                  className="rounded-md bg-slate-100"
                >
                  <img 
                    src="./combine.png"
                    alt="map-image"
                    style={{ width: "auto", height: "auto" }}
                  />
                </Box>
                <Box
                  fullWidth
                  sx={{ p: 1, maxWidth: 800 }}
                  className="object-contain rounded-md bg-slate-100"
                >
                  <img
                    src="./map1.jpg"
                    alt="map-image"
                    style={{ width: 800, height: "auto" }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item sm>
              <Box className="w-full min-h-full rounded-md shadow-lg bg-slate-100">
                <Container component="main" maxWidth="sm" >
                  <CssBaseline />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                       pt: 6 ,
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
                              onChange={() => {
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
                          <Grid item xs={12}>
                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              sx={{ mt: 3, mb: 2 }}
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

                          <Grid item xs={12}>
                            
                              <Link  variant="body2" >
                              {/* <RouterLink to="/signup"> */}
                              <Button onClick={handleCreateAccount}>

                                  Don't have an account? Sign Up
                              </Button>
                            {/* </RouterLink> */}
                              </Link>
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
