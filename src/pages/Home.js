import React from 'react'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div>Home
      <Outlet />
    </div>
  )
}

export default Home





// OLD code might need later
// import React from "react";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import MenuIcon from "@material-ui/icons/Menu";
// import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import { Root, Header, Nav, Content, Footer } from "../Layout";
// import { useState } from "react";
// import { Copyright } from "../components/Footer";
// import { Box } from "@mui/system";
// import { Routes, Route, Link, Outlet } from "react-router-dom";
// import { Typography } from "@mui/material";
// import { Button } from "@mui/base";
// import { useAtom } from "jotai";
// import { AUTH_ISLOGGEDIN } from "../App";
// import { useNavigate} from "react-router-dom";
// import { AccountCircle, ExitToApp } from "@mui/icons-material";
// import Upload from './DataAccess/Upload';
// import Download from './DataAccess/Download';
// import Datasets1 from './ERA5Data/Datasets1';
// import Datasets2 from './ERA5Data/Datasets2';


// const config = {
//   navAnchor: "left",
//   navVariant: {
//     xs: "temporary",
//     sm: "temporary",
//     md: "permanent",
//   },
//   navWidth: {
//     xs: 240,
//     sm: 256,
//     md: 256,
//   },
//   collapsible: {
//     xs: false,
//     sm: false,
//     md: false,
//   },
//   collapsedWidth: {
//     xs: 64,
//     sm: 64,
//     md: 64,
//   },
//   clipped: {
//     xs: true,
//     sm: true,
//     md: true,
//   },
//   headerPosition: {
//     xs: "relative",
//     sm: "relative",
//     md: "relative",
//   },
//   squeezed: {
//     xs: false,
//     sm: false,
//     md: true,
//   },
//   footerShrink: {
//     xs: false,
//     sm: false,
//     md: true,
//   },
// };

// const Home = () => {
//   const [username, setUsername] = useState("User");
//   const [isLoggedIn, setIsLoggedIn] = useAtom(AUTH_ISLOGGEDIN);
//   const navigate = useNavigate();
//   console.log("Logged IN : ", isLoggedIn);
//   if (!isLoggedIn) {
//     navigate("/");
//   }
 
//   return (
//         <Routes>
//           <Route path="/home/" element={<EmptyHome/>} ></Route>
//           <Route path="/home/access" element={<EmptyData/>}>
//             <Route path="/home/access/upload" element={<Upload/>}></Route>
//             <Route path="/home/access/download" element={<Download/>}></Route>
//           </Route>
//           <Route path="/home/data" element={<EmptyEra/>}>
//             <Route path="/home/data/datasets1" element={<Datasets1/>}></Route>
//             <Route path="/home/data/datasets2" element={<Datasets2/>}></Route>
//           </Route>
//         </Routes>

//   );
// };

// export default Home;


// function Home() {
//   return (
//     <div>
//       <h2>Home</h2>
//       <Outlet />
//     </div>
//   );
// }

// function EmptyData() {
//   return (
//     <div>
//       <h2>Data Access</h2>
//       <Outlet />
//     </div>
//   );
// }

// function EmptyEra() {
//   return (
//     <div>
//       <h2>EmptyEra DATA</h2>
//       <Outlet />
//     </div>
//   );
// }
