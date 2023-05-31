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
import { Nav } from "../Layout";
import HeaderSidebar from "./HeaderSidebar";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const [selectedPath, setSelectedPath] = useState(location.pathname);

  const handleClick = () => {
    setOpen(!open);
  };

  const isActive = (path) => {
    return selectedPath === path;
  };

  useEffect(() => {
    setSelectedPath(location.pathname);
  }, [location.pathname]);
   
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold ' : 'normal ',
      className: isActive ? 'text-green-500 ' : 'hover:text-green-500 '
    }
  }
  return (
    
    <Nav
      collapsedIcon={{
        inactive: <ChevronLeftIcon sx={{color:"primary.main"}} />,
        active: <ChevronRightIcon sx={{color:"primary.main"}}/>,
      }}
      header={(ctx) => <HeaderSidebar/>}
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
          style={navLinkStyles}

        >
          <ListItemButton selected={isActive("/home/")}>
            <ListItemIcon>
              <HomeIcon sx={{color:"primary.main"}} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </NavLink>

        <NavLink
          to="/home/access"
          className="hover:text-green-500"
        >
          <ListItemButton onClick={handleClick} selected={isActive("/home/access")}>
            <ListItemIcon>
              <FolderIcon sx={{color:"primary.main"}} />
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
            >
              <ListItemButton sx={{ pl: 4 }} selected={isActive("/home/access/upload")}>
                <ListItemIcon>
                  <FileUploadIcon sx={{color:"primary.main"}} />
                </ListItemIcon>
                <ListItemText primary="Upload" />
              </ListItemButton>
            </NavLink>
            <NavLink
              to="/home/access/download"
              className="hover:text-green-500"
            >
              <ListItemButton sx={{ pl: 4 }} selected={isActive("/home/access/download")}>
                <ListItemIcon>
                  <DownloadIcon sx={{color:"primary.main"}} />
                </ListItemIcon>
                <ListItemText primary="Download" />
              </ListItemButton>
            </NavLink>
          </List>
        </Collapse>
        <NavLink
            to="/home/data"
            className="hover:text-green-500"
          >
            <ListItemButton onClick={handleClick} selected={isActive("/home/data")}>
              <ListItemIcon>
                <FolderIcon sx={{color:"primary.main"}}/>
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
              >
                <ListItemButton sx={{ pl: 4 }} selected={isActive("/home/data/datasets1")}>
                  <ListItemIcon>
                    <DatasetIcon sx={{color:"primary.main"}}/>
                  </ListItemIcon>
                  <ListItemText primary="Datasets 1" />
                </ListItemButton>
              </NavLink>
              <NavLink
                to="/home/data/datasets2"
                className="hover:text-green-500"
              >
                <ListItemButton sx={{ pl: 4 }} selected={isActive("/home/data/datasets2")}>
                  <ListItemIcon>
                    <DatasetIcon sx={{color:"primary.main"}}/>
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

