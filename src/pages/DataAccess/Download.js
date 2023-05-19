import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

const Download = () => {
  const [file, setFile] = useState();
  const handleFile = (event) => {
    setFile(event);
  };
  return (
    <div className="items-center block m-3 text-center rounded-md backdrop-blur-md">
      <Typography variant="body1">Download Data from AWS</Typography>
      <Stack
        paddingTop={2}
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="center"
        spacing={4}
      >
        
        <TextField
          margin="normal"
          required
          sx={{width:{xs:"auto", sm:400}}}
          name="password"
          label="Search a file to download…"
          type="text"
          onChange={(ev) => {
            setFile(ev);
          }}
        />
        <Button variant="contained" component="label" sx={{width:200}}>
          Download
        </Button>
      </Stack>
    </div>
  );
};

export default Download;
