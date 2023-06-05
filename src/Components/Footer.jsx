import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

/**
 * Copyright component displays the copyright
 * information with a link to Parametrics.ag.
 *
 * @returns {JSX.Element} - Copyright component
 */
export function Copyright() {
  return (
    <Container maxWidth="sm" align="center">
      <Typography variant="body1">
        {"Copyright © "} {new Date().getFullYear()}
        {" GARS / "}
        <Link color="inherit" href="https://parametrics.ag/">
          Parametrics.ag
        </Link>
      </Typography>
      <Typography variant="body2" color="text.secondary">
        All rights reserved | Privacy Policy
      </Typography>
    </Container>
  );
}

/**
 * Footer component is a component that displays the footer section of the application.
 *
 * @returns {JSX.Element} - Footer component
 */
export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Copyright />
      </Box>
    </Box>
  );
}
