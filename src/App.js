import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Root, Header, Nav, Content, Footer } from "./Layout";
import { Copyright } from "./components/Footer";
import { Routes, Route, Link, Outlet, useNavigate } from "react-router-dom";
import HeaderInfo from "./components/HeaderInfo";
import { useAtom, atom } from "jotai";
import Upload from "./pages/DataAccess/Upload";
import DataIndex from "./pages/DataAccess/DataIndex";
import Download from "./pages/DataAccess/Download";
import Datasets1 from "./pages/ERA5Data/Datasets1";
import Datasets2 from "./pages/ERA5Data/Datasets2";
import SignIn from "./components/Signin";
import SignUp from "./components/Signup";
import Sidebar from "./components/Sidebar";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import EraIndex from "./pages/ERA5Data/EraIndex";
import { themeOptions } from "./utils/muiTheme";
import { AuthProvider, useAuth } from "./utils/auth";
import { RequireAuth } from "./utils/RequireAuth";
import { config } from "./utils/layoutConfig";
import Home from "./pages/Home";

const theme = createTheme(themeOptions);

export const AUTH_ISLOGGEDIN = atom(false);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(AUTH_ISLOGGEDIN);
  const [status, setStatus] = useState("signin");
  const navigate = useNavigate();
  const auth = useAuth();
  const handleLogout = () => {
    setIsLoggedIn(false);
    auth.logout()
    navigate('/')
  };

  return (
    <MuiThemeProvider theme={theme}>
      <AuthProvider>
        <Root
          config={config}
          style={{ minHeight: "100vh" }}
          className="newcover"
        >
          <CssBaseline />
          <Header
            menuIcon={{ inactive: <MenuIcon />, active: <ChevronLeftIcon /> }}
          >
            <HeaderInfo logout={handleLogout} />
          </Header>
          {isLoggedIn && <Sidebar />}

          <Content className="p-2">
            <Routes>
              <Route
                path="/"
                element={
                  <SignIn setStatus={setStatus} setLoggedIn={setIsLoggedIn} />
                }
              />
              <Route
                path="/signup"
                element={<SignUp setStatus={setStatus} />}
              />
              <Route
                path="/home/"
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />
              <Route
                path="/home/access"
                element={
                  <RequireAuth>
                    <DataIndex />
                  </RequireAuth>
                }
              />
              <Route
                path="/home/access/upload"
                element={
                  <RequireAuth>
                    <Upload />
                  </RequireAuth>
                }
              />
              <Route
                path="/home/access/download"
                element={
                  <RequireAuth>
                    <Download />
                  </RequireAuth>
                }
              />
              <Route
                path="/home/data"
                element={
                  <RequireAuth>
                    <EraIndex />
                  </RequireAuth>
                }
              />
              <Route
                path="/home/data/datasets1"
                element={
                  <RequireAuth>
                    <Datasets1 />
                  </RequireAuth>
                }
              />
              <Route
                path="/home/data/datasets2"
                element={
                  <RequireAuth>
                    <Datasets2 />
                  </RequireAuth>
                }
              />
            </Routes>
          </Content>
          <Footer className="bg-gray-100">
            <Copyright />
          </Footer>
        </Root>
      </AuthProvider>
    </MuiThemeProvider>
  );
};

export default App;


