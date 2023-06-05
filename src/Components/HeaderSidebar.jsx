import React from "react";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { ExitToApp } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_ISLOGGEDIN } from "../App";
import { useAuth } from "../Utils/Auth";

/**
 * HeaderSidebar component displays the header information for sidebar section.
 * @component
 *
 * @returns {JSX.Element} HeaderSidebar component
 */
const HeaderSidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(AUTH_ISLOGGEDIN);
  const navigate= useNavigate();

  const auth = useAuth()
  const handleLogoutAuth = () => {
    setIsLoggedIn(false);
    auth.logout()
    navigate('/')
  }
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", m:1, p: 0, bgcolor: "inherit", maxHeight:80 , alignItems:"center"}} className="justify-center">
        {isLoggedIn && ( 
          <>
            <Box sx={{ m: 1, display:{sm:"flex", alignItems:"center"}}}>
              <Typography variant="button" className="text-black">{auth.user}</Typography>{" "}
            </Box>
            <Box sx={{ m: 1, alignItems:"right", color:"primary.main" }}>
              <Link to="/">
                <Button variant="outlined" onClick={handleLogoutAuth} className="flex">
                    Logout 
                  <ExitToApp sx={{color:"primary.main"}}/>
                </Button>
              </Link>
            </Box>
          </>
        )}
      </Box>
    </div>
  );
};

export default HeaderSidebar;
