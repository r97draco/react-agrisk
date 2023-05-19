import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import FolderIcon from "@mui/icons-material/Folder";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DownloadIcon from "@mui/icons-material/Download";
import DatasetIcon from "@mui/icons-material/Dataset";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { NavLink, useLocation } from "react-router-dom";
import { Nav, Header } from "../Layout";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [selectedPath, setSelectedPath] = useState(location.pathname);

  const handleClick = () => {
    setOpen(!open);
  };

  const isActive = (path) => {
    console.log("path :", path)
    return selectedPath === path;
  };

  useEffect(() => {
    setSelectedPath(location.pathname);
  }, [location.pathname]);

  return (
    <Nav
      collapsedIcon={{
        inactive: <ChevronLeftIcon />,
        active: <ChevronRightIcon />,
      }}
      header={(ctx) => <Header />}
    >
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <NavLink
          to="/home/"
          className="hover:text-green-500"
          activeClassName="text-green-500"
        >
          <ListItemButton selected={isActive("/home/")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </NavLink>

        <NavLink
          to="/home/access"
          className="hover:text-green-500"
          activeClassName="text-green-500"
        >
          <ListItemButton onClick={handleClick} selected={isActive("/home/access")}>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="Data Access" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </NavLink>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <NavLink
              to="/home/access/upload"
              className="hover:text-green-500"
              activeClassName="text-green-500"
            >
              <ListItemButton sx={{ pl: 4 }} selected={isActive("/home/access/upload")}>
                <ListItemIcon>
                  <FileUploadIcon />
                </ListItemIcon>
                <ListItemText primary="Upload" />
              </ListItemButton>
            </NavLink>
            <NavLink
              to="/home/access/download"
              className="hover:text-green-500"
              activeClassName="text-green-500"
            >
              <ListItemButton sx={{ pl: 4 }} selected={isActive("/home/access/download")}>
                <ListItemIcon>
                  <DownloadIcon />
                </ListItemIcon>
                <ListItemText primary="Download" />
              </ListItemButton>
            </NavLink>
          </List>
        </Collapse>
        <NavLink
            to="/home/data"
            className="hover:text-green-500"
            activeClassName="text-green-500"
          >
            <ListItemButton onClick={handleClick} selected={isActive("/home/data")}>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary="ERA5 Data" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </NavLink>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <NavLink
                to="/home/data/datasets1"
                className="hover:text-green-500"
                activeClassName="text-green-500"
              >
                <ListItemButton sx={{ pl: 4 }} selected={isActive("/home/data/datasets1")}>
                  <ListItemIcon>
                    <DatasetIcon />
                  </ListItemIcon>
                  <ListItemText primary="Datasets 1" />
                </ListItemButton>
              </NavLink>
              <NavLink
                to="/home/data/datasets2"
                className="hover:text-green-500"
                activeClassName="text-green-500"
              >
                <ListItemButton sx={{ pl: 4 }} selected={isActive("/home/data/datasets2")}>
                  <ListItemIcon>
                    <DatasetIcon />
                  </ListItemIcon>
                  <ListItemText primary="Datasets 2" />
                </ListItemButton>
              </NavLink>
            </List>
          </Collapse>
        </List>
      </Nav>
    );
};

export default Sidebar;







// import React, { useState } from "react";
// import List from "@mui/material/List";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import Collapse from "@mui/material/Collapse";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import HomeIcon from "@mui/icons-material/Home";
// import FolderIcon from "@mui/icons-material/Folder";
// import FileUploadIcon from "@mui/icons-material/FileUpload";
// import DownloadIcon from "@mui/icons-material/Download";
// import DatasetIcon from "@mui/icons-material/Dataset";
// import { Routes, Route, Link, Outlet } from "react-router-dom";
// import { Root, Header, Nav, Content, Footer } from "../Layout";
// import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";


// const Sidebar = () => {
//   const [open, setOpen] = useState(false);

//   const handleClick = () => {
//     setOpen(!open);
//   };
//   return (
//     <Nav
//       collapsedIcon={{
//         inactive: <ChevronLeftIcon />,
//         active: <ChevronRightIcon />,
//       }}
//       header={(ctx) => <Header />}
//     >
//       <List
//         sx={{
//           width: "100%",
//           maxWidth: 360,
//           bgcolor: "background.paper",
//         }}
//         component="nav"
//         aria-labelledby="nested-list-subheader"
//       >
//         <Link to="/home/" className="hover:text-green-500">
//           <ListItemButton>
//             <ListItemIcon>
//               <HomeIcon />
//             </ListItemIcon>
//             <ListItemText primary="Home" />
//           </ListItemButton>
//         </Link>

//         <Link to="/home/access" className="hover:text-green-500">
//           <ListItemButton onClick={handleClick}>
//             <ListItemIcon>
//               <FolderIcon />
//             </ListItemIcon>
//             <ListItemText primary="Data Access" />
//             {open ? <ExpandLess /> : <ExpandMore />}
//           </ListItemButton>
//         </Link>
//         <Collapse in={open} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <Link to="/home/access/upload" className="hover:text-green-500">
//               <ListItemButton sx={{ pl: 4 }}>
//                 <ListItemIcon>
//                   <FileUploadIcon />
//                 </ListItemIcon>
//                 <ListItemText primary="Upload" />
//               </ListItemButton>
//             </Link>
//             <Link to="/home/access/download" className="hover:text-green-500">
//               <ListItemButton sx={{ pl: 4 }}>
//                 <ListItemIcon>
//                   <DownloadIcon />
//                 </ListItemIcon>
//                 <ListItemText primary="Download" />
//               </ListItemButton>
//             </Link>
//           </List>
//         </Collapse>
//         <Link to="/home/data" className="hover:text-green-500">
//           <ListItemButton onClick={handleClick}>
//             <ListItemIcon>
//               <FolderIcon />
//             </ListItemIcon>
//             <ListItemText primary="ERA5 Data" />
//             {open ? <ExpandLess /> : <ExpandMore />}
//           </ListItemButton>
//         </Link>
//         <Collapse in={open} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <Link to="/home/data/datasets1" className="hover:text-green-500">
//               <ListItemButton sx={{ pl: 4 }}>
//                 <ListItemIcon>
//                   <DatasetIcon />
//                 </ListItemIcon>
//                 <ListItemText primary="Datasets 1" />
//               </ListItemButton>
//             </Link>
//             <Link to="/home/data/datasets2" className="hover:text-green-500">
//               <ListItemButton sx={{ pl: 4 }}>
//                 <ListItemIcon>
//                   <DatasetIcon />
//                 </ListItemIcon>
//                 <ListItemText primary="Datasets 2" />
//               </ListItemButton>
//             </Link>
//           </List>
//         </Collapse>
//       </List>
//     </Nav>
//   );
// };

// export default Sidebar;
