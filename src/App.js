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
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import EraIndex from "./pages/ERA5Data/EraIndex";
import { themeOptions } from "./utils/muiTheme";



const theme = createTheme(themeOptions);

export const AUTH_ISLOGGEDIN = atom(false);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(AUTH_ISLOGGEDIN);
  const [status, setStatus] = useState("signin");
  const navigate = useNavigate();
  // if (!isLoggedIn) {
  //   if (status === "signin") {
  //     navigate("/");
  //   } else {
  //     navigate("/signup");
  //   }
  // }
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <MuiThemeProvider theme={theme}>
    <Root config={config} style={{ minHeight: "100vh" }} className="newcover">
      <CssBaseline />
      <Header menuIcon={{ inactive: <MenuIcon />, active: <ChevronLeftIcon /> }} >
        <HeaderInfo logout={handleLogout} />
      </Header>
      {isLoggedIn && <Sidebar />}

      <Content className="p-2">
        <Routes>
          <Route path="/" element={ <SignIn setStatus={setStatus} setLoggedIn={setIsLoggedIn} />}></Route>
          <Route path="/signup" element={<SignUp setStatus={setStatus} />}></Route>
          <Route path="/home/" element={<EmptyHome />}></Route>
          <Route path="/home/access" element={<DataIndex />}>
          </Route>
            <Route path="/home/access/upload" element={<Upload />}></Route>
            <Route path="/home/access/download" element={<Download />}></Route>
          <Route path="/home/data" element={<EraIndex />}> </Route>
            <Route path="/home/data/datasets1" element={<Datasets1 />}></Route>
            <Route path="/home/data/datasets2" element={<Datasets2 />}></Route>
        </Routes>
      </Content>
      <Footer className="bg-gray-100">
        <Copyright />
      </Footer>
    </Root>
    </MuiThemeProvider>
  );
};

export default App;

function AuthContent() {
  return (
    <Content className="p-2" navVariant="temporary">
      <Routes>

        <Route path="/home/" element={<EmptyHome />}></Route>
        <Route path="/home/access">
          <Route path="/home/access/upload" element={<Upload />}></Route>
          <Route path="/home/access/download" element={<Download />}></Route>
        </Route>
        <Route path="/home/data">
          <Route path="/home/data/datasets1" element={<Datasets1 />}></Route>
          <Route path="/home/data/datasets2" element={<Datasets2 />}></Route>
        </Route>
      </Routes>
    </Content>
  );
}

function EmptyHome() {
  return (
    <div>
      <h2>Home</h2>
      <Outlet />
    </div>
  );
}

function EmptyData() {
  return (
    <div>
      <h2>Data Access</h2>
      <Outlet />
    </div>
  );
}

function EmptyEra() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

const Base = () => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(AUTH_ISLOGGEDIN);
  const [status, setStatus] = useState("signin");
  return (
    <>
      {status === "signin" && (
        <SignIn setStatus={setStatus} setLoggedIn={setIsLoggedIn} />
      )}
      {status === "signup" && <SignUp setStatus={setStatus} />}
    </>
  );
};

const config = {
  navAnchor: "left",
  navVariant: {
    xs: "temporary",
    sm: "temporary",
    md: "permanent",
  },
  navWidth: {
    xs: 240,
    sm: 256,
    md: 256,
  },
  collapsible: {
    xs: false,
    sm: false,
    md: false,
  },
  collapsedWidth: {
    xs: 64,
    sm: 64,
    md: 64,
  },
  clipped: {
    xs: true,
    sm: true,
    md: true,
  },
  headerPosition: {
    xs: "relative",
    sm: "relative",
    md: "relative",
  },
  squeezed: {
    xs: false,
    sm: false,
    md: true,
  },
  footerShrink: {
    xs: false,
    sm: false,
    md: false,
  },
};
