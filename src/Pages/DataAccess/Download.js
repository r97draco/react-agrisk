import { CircularProgress, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { axiosApiCall } from "../../Utils/API";
import axios from "axios";
import { Alert } from "@mui/material";
import { saveAs } from "file-saver";

// const jun3link = "https://h57y6aazo9.execute-api.ca-central-1.amazonaws.com/download-era5-gars-data?username=rommelnuque05&filename=test_ericknuque_20230601000000.csv";

const photoURL = "https://picsum.photos/200";

const Download = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileInput, setFileInput] = useState("file-name");
  const [isDownloaded, setIsDownloaded] = useState("undefined");

  const handleDownload = async () => {
    //----------------GENERATING THE URL------------------------------------
    const endpoint =
      "https://h57y6aazo9.execute-api.ca-central-1.amazonaws.com/download-era5-gars-data";
    const username = "rommelnuque05";
    const filename =
      fileInput !== "" ? fileInput : "test_ericknuque_20230601000000.csv";
    const params = {
      username: username,
      filename: filename,
    };
    const queryString = new URLSearchParams(params).toString();
    const URL = `${endpoint}?${queryString}`;
    //-------------------------------------------------------------
    //----------------FOR PROXY SERVER-----------------------------------------
    const options = {
      method: "GET",
      url: "http://localhost:8080/",
      responseType: "blob",
      params: {
        url: "https://h57y6aazo9.execute-api.ca-central-1.amazonaws.com/download-era5-gars-data",
        username: "rommelnuque05",
        // filename:"test_ericknuque_20230601000000.csv",
        filename: fileInput,
      },
    };
    //-----------------END OF PROXY--------------------------------------------

    const testnewurl =
      "https://h57y6aazo9.execute-api.ca-central-1.amazonaws.com/download-era5-gars-data?test='Testing from Erick'";
    try {
      const response = await axios({
        url: testnewurl,
        method: "GET",
        responseType: "blob",
      });
      setLoading(true);

      console.log(`Res`, response);
      let filename = "file";
      // console.log(`headers`, response.headers);

      const contentDisposition = response.headers["content-disposition"];
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename=(.+)$/i);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      } else {
        // const urlSegments = URL.match(/filename=(.+)$/i);
        // filename = urlSegments[urlSegments.length - 1];
        // filename = urlSegments?urlSegments[1]:"file"
        filename = fileInput !== "" ? fileInput : "file";
      }
      if (response.status === 200 && response.data) {
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        saveAs(blob, filename);
        setIsDownloaded("Successful");
      } else {
        console.error("Response is not OK:", response.status);
        setIsDownloaded("Unsuccessful");
        throw new Error("Response is not OK");
      }
    } catch (error) {
      setIsDownloaded("Unsuccessful");
      console.error("Error in file download:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="items-center block p-2 m-0 text-center rounded-md shadow-lg bg-gray-50">
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
          sx={{ width: { xs: "auto", sm: 400 } }}
          name="filename"
          label="Search a file to download…"
          type="text"
          defaultValue={fileInput}
          onChange={(ev) => {
            setFileInput(ev.target.value);
            setIsDownloaded("undefined");
          }}
        />
        {file && (
          <Button
            variant="text"
            component="a"
            href={file}
            download
            sx={{ width: 200, flexGrow: 1 }}
          >
            Download File
          </Button>
        )}
        {!file && (
          <Button
            variant="contained"
            onClick={handleDownload}
            component="label"
            sx={{ width: 200 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={27} /> : "Download"}
          </Button>
        )}
      </Stack>
      {isDownloaded === "Successful" && (
        <Alert severity="success">Success: File Downlaoded Successfully</Alert>
      )}
      {isDownloaded === "Unsuccessful" && (
        <Alert severity="error">Error: Download Unsuccessful</Alert>
      )}
    </div>
  );
};
export default Download;
