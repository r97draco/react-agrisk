import React, { useState } from "react";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { ExitToApp } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AUTH_ISLOGGEDIN } from "../App";
import { useAuth } from "../Utils/Auth";

const HeaderInfo = ({ logout }) => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(AUTH_ISLOGGEDIN);
  const navigate = useNavigate();

  const auth = useAuth();
  const handleLogoutAuth = () => {
    setIsLoggedIn(false);
    auth.logout();
    navigate("/");
  };
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          p: 0.2,
          bgcolor: "inherit",
          maxHeight: 80,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flexGrow: 0,
            m: 1,
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={require("../logo1.png")}
            alt="Logo"
            style={{ width: "auto", height: 30 }}
          />
        </Box>
        <Box sx={{ flexGrow: 1, m: 1 }} className="text-black">
          <Aglogo />
        </Box>
        {isLoggedIn && (
          <>
            <Box
              sx={{
                m: 1,
                display: { xs: "none", sm: "flex", alignItems: "center" },
              }}
            >
              <Typography variant="button" className="text-black">
                Welcome {auth.user}
              </Typography>{" "}
            </Box>
            <Box sx={{ m: 1, alignItems: "center", color: "primary.main" }}>
              <Link to="/">
                <Button
                  variant="outlined"
                  onClick={handleLogoutAuth}
                  className="flex"
                >
                  {/* <Typography sx={{display:{xs:"none", sm:"flex"}}} >
                    Logout 
                  </Typography> */}
                  <span className="hidden sm:flex">Logout</span>
                  <ExitToApp sx={{ color: "primary.main" }} />
                </Button>
              </Link>
            </Box>
          </>
        )}
      </Box>
    </div>
  );
};

export default HeaderInfo;

function Aglogo() {
  return (
    <svg
      width="100"
      height="52.5"
      viewBox="0 0 165 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_303_3811)">
        <path
          d="M16.33 53.53C15.03 40.16 3.30002 44.58 0.300017 31.73C-0.179983 38.9 -0.239983 45.71 1.22002 49.24C4.97002 57.77 12.82 56.62 16.31 65.83L16.32 65.85C16.32 65.85 16.32 65.83 16.33 65.82C19.82 56.61 27.67 57.76 31.42 49.23C32.88 45.69 32.82 38.88 32.34 31.72C29.35 44.57 17.61 40.14 16.31 53.52"
          fill="#343333"
        ></path>
        <path
          d="M16.33 27.74C19.12 20.37 25.39 21.3 28.39 14.47C29.56 11.64 29.51 6.20999 29.13 0.48999C26.78 11.23 17.39 7.22999 16.33 17.87C15.28 7.22999 5.88998 11.23 3.52998 0.48999C3.14998 6.20999 3.09998 11.65 4.26998 14.47C7.25998 21.29 13.54 20.37 16.33 27.74Z"
          fill="#343333"
        ></path>
        <path
          d="M16.33 45.95C19.45 37.7 26.47 38.74 29.82 31.1C31.12 27.94 31.08 21.86 30.64 15.45C27.99 26.83 17.49 22.98 16.32 34.91C15.15 22.98 4.65002 26.82 2.00002 15.45C1.57002 21.85 1.52002 27.94 2.82002 31.1C6.17002 38.73 13.2 37.69 16.31 45.95"
          fill="#343333"
        ></path>
        <path
          d="M45.72 37.42L37 54.32H43.93L45.26 51.39H52.04L53.37 54.32H60.32L51.53 37.42H45.72ZM46.98 47.57L48.63 43.74L50.3 47.57H46.98Z"
          fill="#343333"
        ></path>
        <path
          d="M71.49 48.32H75.17C74.94 48.84 74.39 49.26 73.52 49.58C72.78 49.87 72.07 50.02 71.39 50.02C70.05 50.02 68.99 49.62 68.22 48.81C67.49 48.05 67.13 47.07 67.13 45.88C67.13 44.54 67.53 43.52 68.34 42.8C69.15 42.09 70.29 41.73 71.76 41.73C73.65 41.73 75.3 42.47 76.72 43.93L80.62 41C79.28 39.64 77.95 38.68 76.62 38.12C75.23 37.52 73.53 37.22 71.51 37.22C68.47 37.22 65.96 37.9 63.98 39.25C61.7 40.8 60.56 43 60.56 45.86C60.56 48.72 61.67 50.88 63.9 52.45C65.84 53.82 68.23 54.51 71.07 54.51C71.97 54.51 72.89 54.38 73.83 54.12C74.93 53.81 75.72 53.39 76.2 52.86V54.31H81.46L81.48 44.74H71.48V48.3L71.49 48.32Z"
          fill="#343333"
        ></path>
        <path
          d="M109.97 42.82C109.97 40.77 109.16 39.32 107.55 38.46C106.24 37.77 104.3 37.42 101.71 37.42H91.42V54.32H97.98V47.97C99.03 47.97 99.88 48.42 100.55 49.33L104.18 54.32H111.91C109.39 51.17 107.41 48.81 105.98 47.22C108.64 46.2 109.97 44.73 109.97 42.81M101.35 44.05H97.86V41.68H101.35C102.66 41.68 103.31 42.07 103.31 42.87C103.31 43.67 102.65 44.06 101.35 44.06"
          fill="#343333"
        ></path>
        <path
          d="M120.02 37.42H113.36V54.32H120.02V37.42Z"
          fill="#343333"
        ></path>
        <path
          d="M140.21 45.63C139.32 45 138.05 44.51 136.38 44.15C136.33 44.14 135.04 43.91 132.5 43.47C130.56 43.15 129.59 42.77 129.59 42.33C129.59 41.75 130.33 41.46 131.82 41.46C132.72 41.46 133.47 41.57 134.06 41.79C134.65 42.01 135.23 42.42 135.82 43.04L141.34 41.32C140.24 39.74 138.85 38.63 137.18 38C135.81 37.48 134.02 37.22 131.83 37.22C129.64 37.22 127.85 37.58 126.19 38.31C124.01 39.26 122.92 40.64 122.92 42.45C122.92 44.14 123.99 45.41 126.12 46.25C127.06 46.62 129.04 47.08 132.08 47.63C134.23 48.02 135.3 48.49 135.3 49.06C135.3 49.51 134.93 49.85 134.19 50.08C133.67 50.23 133.09 50.3 132.45 50.3C130.37 50.3 128.96 49.61 128.24 48.24L122.21 48.94C122.94 51.06 124.24 52.56 126.13 53.44C127.7 54.18 129.8 54.55 132.45 54.55C134.69 54.55 136.7 54.15 138.48 53.36C140.8 52.33 141.97 50.83 141.97 48.88C141.97 47.52 141.39 46.43 140.23 45.61"
          fill="#343333"
        ></path>
        <path
          d="M163.67 37.42H155.75L150.69 42.29V37.42H144.14V54.32H150.69V49.29L155.85 54.32H164.45L154.54 45.73L163.67 37.42Z"
          fill="#343333"
        ></path>
        <path
          d="M43.96 27.26V27.23C43.96 24.03 46.41 21.32 49.86 21.32C51.85 21.32 53.08 21.88 54.26 22.87L52.99 24.39C52.11 23.64 51.24 23.17 49.79 23.17C47.68 23.17 46.08 25.02 46.08 27.21V27.24C46.08 29.59 47.63 31.32 49.97 31.32C51.05 31.32 52.03 30.98 52.73 30.45V28.31H49.81V26.56H54.68V31.36C53.55 32.32 51.94 33.14 49.91 33.14C46.33 33.14 43.98 30.59 43.98 27.26"
          fill="#343333"
        ></path>
        <path
          d="M57.27 21.51H59.28V31.11H65.29V32.94H57.27V21.51Z"
          fill="#343333"
        ></path>
        <path
          d="M66.23 27.26V27.23C66.23 24.01 68.71 21.32 72.23 21.32C75.75 21.32 78.19 23.98 78.19 27.2V27.23C78.19 30.45 75.71 33.14 72.2 33.14C68.69 33.14 66.24 30.48 66.24 27.26M76.09 27.26V27.23C76.09 25.01 74.47 23.16 72.2 23.16C69.93 23.16 68.34 24.97 68.34 27.2V27.23C68.34 29.45 69.96 31.28 72.23 31.28C74.5 31.28 76.09 29.48 76.09 27.26Z"
          fill="#343333"
        ></path>
        <path
          d="M80.62 21.51H85.75C87.06 21.51 88.09 21.87 88.74 22.52C89.25 23.03 89.51 23.65 89.51 24.42V24.45C89.51 25.82 88.73 26.56 87.88 27C89.22 27.46 90.15 28.23 90.15 29.78V29.81C90.15 31.85 88.47 32.95 85.92 32.95H80.63V21.52L80.62 21.51ZM87.5 24.75C87.5 23.85 86.78 23.3 85.49 23.3H82.6V26.34H85.34C86.63 26.34 87.5 25.83 87.5 24.79V24.76V24.75ZM85.79 28.03H82.6V31.17H85.93C87.3 31.17 88.14 30.63 88.14 29.6V29.57C88.14 28.61 87.37 28.03 85.79 28.03Z"
          fill="#343333"
        ></path>
        <path
          d="M96.47 21.43H98.33L103.36 32.95H101.24L100.08 30.19H94.67L93.49 32.95H91.43L96.46 21.43H96.47ZM99.35 28.41L97.37 23.84L95.41 28.41H99.35Z"
          fill="#343333"
        ></path>
        <path
          d="M105.32 21.51H107.33V31.11H113.34V32.94H105.32V21.51Z"
          fill="#343333"
        ></path>
        <path
          d="M91.13 64.79L91.64 64.19C92.4 64.88 93.13 65.22 94.14 65.22C95.15 65.22 95.77 64.7 95.77 63.98V63.96C95.77 63.28 95.41 62.9 93.87 62.57C92.19 62.21 91.42 61.66 91.42 60.46V60.44C91.42 59.29 92.43 58.45 93.82 58.45C94.88 58.45 95.65 58.75 96.39 59.35L95.91 59.99C95.23 59.44 94.55 59.2 93.8 59.2C92.85 59.2 92.25 59.72 92.25 60.38V60.4C92.25 61.09 92.63 61.48 94.23 61.82C95.86 62.17 96.61 62.77 96.61 63.89V63.91C96.61 65.16 95.57 65.98 94.12 65.98C92.96 65.98 92.01 65.59 91.14 64.81"
          fill="#343333"
        ></path>
        <path
          d="M99.36 62.22V62.2C99.36 60.19 100.87 58.42 103.1 58.42C105.33 58.42 106.82 60.16 106.82 62.18V62.2C106.82 64.21 105.31 65.98 103.08 65.98C100.85 65.98 99.36 64.24 99.36 62.22ZM105.96 62.22V62.2C105.96 60.54 104.75 59.18 103.08 59.18C101.41 59.18 100.22 60.52 100.22 62.17V62.19C100.22 63.85 101.43 65.21 103.1 65.21C104.77 65.21 105.96 63.87 105.96 62.21"
          fill="#343333"
        ></path>
        <path
          d="M109.96 58.55H110.78V65.09H114.89V65.86H109.96V58.55Z"
          fill="#343333"
        ></path>
        <path
          d="M117.49 62.8V58.55H118.31V62.75C118.31 64.33 119.16 65.21 120.54 65.21C121.92 65.21 122.74 64.4 122.74 62.8V58.55H123.56V62.74C123.56 64.87 122.34 65.97 120.51 65.97C118.68 65.97 117.47 64.86 117.47 62.8"
          fill="#343333"
        ></path>
        <path
          d="M128.86 59.31H126.41V58.55H132.14V59.31H129.69V65.86H128.86V59.31Z"
          fill="#343333"
        ></path>
        <path
          d="M135.98 58.55H135.16V65.86H135.98V58.55Z"
          fill="#343333"
        ></path>
        <path
          d="M139.2 62.22V62.2C139.2 60.19 140.71 58.42 142.93 58.42C145.15 58.42 146.65 60.16 146.65 62.18V62.2C146.65 64.21 145.14 65.98 142.91 65.98C140.68 65.98 139.19 64.24 139.19 62.22M145.79 62.22V62.2C145.79 60.54 144.58 59.18 142.91 59.18C141.24 59.18 140.05 60.52 140.05 62.17V62.19C140.05 63.85 141.26 65.21 142.93 65.21C144.6 65.21 145.79 63.87 145.79 62.21"
          fill="#343333"
        ></path>
        <path
          d="M149.8 58.55H150.57L155.17 64.41V58.55H155.97V65.86H155.32L150.6 59.87V65.86H149.8V58.55Z"
          fill="#343333"
        ></path>
        <path
          d="M158.96 64.79L159.47 64.19C160.23 64.88 160.96 65.22 161.98 65.22C163 65.22 163.61 64.7 163.61 63.98V63.96C163.61 63.28 163.24 62.9 161.71 62.57C160.03 62.21 159.26 61.66 159.26 60.46V60.44C159.26 59.29 160.27 58.45 161.66 58.45C162.73 58.45 163.49 58.75 164.23 59.35L163.75 59.99C163.07 59.44 162.39 59.2 161.64 59.2C160.69 59.2 160.09 59.72 160.09 60.38V60.4C160.09 61.09 160.47 61.48 162.07 61.82C163.7 62.17 164.45 62.77 164.45 63.89V63.91C164.45 65.16 163.41 65.98 161.96 65.98C160.8 65.98 159.85 65.59 158.98 64.81"
          fill="#343333"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_303_3811">
          <rect
            width="164.45"
            height="65.49"
            fill="#343333"
            transform="translate(0 0.48999)"
          ></rect>
        </clipPath>
      </defs>
    </svg>
  );
}