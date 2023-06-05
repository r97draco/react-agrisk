import { CircularProgress, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Alert } from "@mui/material";
import { saveAs } from "file-saver";

/**
 * DownloadComponent renders a text input component to input a filename from the user and enables downloading the file from an API.
 *
 * @returns {JSX.Element} - DownloadComponent div
 */
const Download = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileInput, setFileInput] = useState(
    "test_ericknuque_20230601000000.csv"
  );
  const [isDownloaded, setIsDownloaded] = useState("undefined");

  /**
   * handleDownload function is responsible for initiating the file download process from an API asynchronously.
   */
  const handleDownload = async () => {
    //----------------GENERATING THE URL------------------------------------
    const endpoint =
      "https://h57y6aazo9.execute-api.ca-central-1.amazonaws.com/download-era5-gars-data";
    const username = "erickpogi2023";
    const filename =
      fileInput !== "" ? fileInput : "test_ericknuque_20230601000000.csv";
    const params = {
      username: username,
      filename: filename,
    };
    const queryString = new URLSearchParams(params).toString();
    const URL = `${endpoint}?${queryString}`;
    //-------------------------------------------------------------
    try {
      setLoading(true);
      const response = await axios({
        url: URL,
        method: "GET",
        responseType: "blob",
      });

      console.log(`Res`, response);
      let filename = fileInput !== "" ? fileInput : "file";
      console.log(`Content Length: `, response.data["size"]);

      if (
        response.status === 200 &&
        response.data &&
        response.data["size"] > 0
      ) {
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        saveAs(blob, filename);
        setIsDownloaded("Successful");
      } else {
        console.error(
          "Response is not OK || No file present:",
          response.status
        );
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
        <Alert severity="error">Error: File Download Unsuccessful</Alert>
      )}
    </div>
  );
};
export default Download;
