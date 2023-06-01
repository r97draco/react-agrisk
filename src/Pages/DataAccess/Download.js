import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { axiosApiCall } from "../../Utils/API";

const Download = () => {
  const [file, setFile] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const handleFile = (event) => {
    setFile(event);
  };

  const handleDownload = () => {
    // const endpoint = "https://5u8lxhfkbj.execute-api.ca-central-1.amazonaws.com/download-era5-gars-data";
    const endpoint = 'https://5u8lxhfkbj.execute-api.ca-central-1.amazonaws.com/download-era5-gars-data?username="ericknuque"&filename="test.csv"&content="abc"';
    const username = "ericknuque";
    // const filename = inputValue;
    const filename = "test_ericknuque_20230601000000.csv";
    const content = "abc";

    const params = {
      username: username,
      filename: filename,
      content: content,
    };
    // axiosApiCall(endpoint, params, setFile);
    fetch(endpoint, {
      method: "GET",
      mode: "no-cors",
    })
      .then((response) => response.json())
      .then((data) => {
        // Process the response data here
        console.log("Fetch API in Download :", data);
        setFile(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Fetch API in Download :", error);
        setFile("error");
      });
  };
  return (
    <div className="items-center block p-2 m-0 text-center rounded-md shadow-lg bg-gray-50 ">
      <Typography variant="body1">Download Data from AWS</Typography>
      <Stack
        paddingTop={2}
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="center"
        spacing={4}
      >
        {
          <TextField
            margin="normal"
            required
            sx={{ width: { xs: "auto", sm: 400 } }}
            name="password"
            label="Search a file to download…"
            type="text"
            onClick={(ev) => setInputValue(ev)}
          />
        }
        {file && (
          <Button
            variant="text"
            component="label"
            sx={{ width: 200, flexGrow: 1 }}
          >
            {file}
          </Button>
        )}
        <Button
          variant="contained"
          onClick={handleDownload}
          component="label"
          sx={{ width: 200 }}
        >
          Download
        </Button>
      </Stack>
    </div>
  );
};

export default Download;
