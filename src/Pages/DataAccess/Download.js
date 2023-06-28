import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Alert } from "@mui/material";
import { saveAs } from "file-saver";
import { FileCopyOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";

/**
 * DownloadComponent renders a text input component to input a filename from the user and enables downloading the file from an API.
 *
 * @returns {JSX.Element} - DownloadComponent div
 */
const Download = () => {
  const [file, setFile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downLoading, setDownLoading] = useState(false);
  const [preSignedUrl, setPreSignedUrl] = useState();
  const [selected, setSelected] = useState();
  const [fileList, setFileList] = useState({
    status: 0,
    count: 0,
    filelist: [],
  });
  const [fileInput, setFileInput] = useState("");
  const [downloadFile, setDowloadFile] = useState("");
  const [isDownloaded, setIsDownloaded] = useState("undefined");
  /**
   * searchFile function is responsible for fetching the filelist from the API asynchronously.
   */
  const searchFile = async () => {
    setLoading(true);
    const URL =
      "https://hmtrekg8w0.execute-api.ca-central-1.amazonaws.com/search-era5-gars-data";
    try {
      const response = await axios({
        url: URL,
        method: "GET",
        params: {
          username: "ericknuque",
        },
      });
      console.log("Res from search", response);
      if (response.data["filelist"].length > 0) setFile(true);
      if (response.status === 200) {
        setFileList(response.data);
        setFilteredList(response.data["filelist"]);
      }
    } catch (error) {
      console.error("Error in file Search:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * handleDownload function is responsible for initiating the file download process from an API asynchronously.
   */
  const handleDownload = async (selectedItem) => {
    if (selectedItem === selected) {
      setSelected(null);
      setPreSignedUrl();
    } else {
      setSelected(selectedItem);
      setDownLoading(true);
      const URL =
        "https://hmtrekg8w0.execute-api.ca-central-1.amazonaws.com/download-era5-gars-data";

      try {
        const response = await axios({
          url: URL,
          method: "GET",
          params: {
            username: "ericknuque",
            filename: selectedItem,
          },
        });
        console.log(selectedItem);
        console.log(`Res`, response);
        if (response.status === 200) {
          let signedUrl = response.data["presigned-url"];
          setPreSignedUrl(signedUrl);
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
        setDownLoading(false);
      }
    }
  };
  const [filteredList, setFilteredList] = useState(fileList["filelist"]);
  const filterList = (text) => {
    if (text !== "") {
      setFilteredList(
        fileList["filelist"].filter((item) => {
          return item.toLowerCase().includes(text.toLowerCase());
        })
      );
    }
    console.log(fileList["filelist"]);
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
            filterList(ev.target.value);
            setIsDownloaded("undefined");
          }}
        />
        <Button
          variant="contained"
          component="label"
          sx={{ width: 200 }}
          onClick={searchFile}
          disabled={loading && preSignedUrl}
        >
          {loading ? <CircularProgress size={27} /> : "Search File"}
        </Button>
        <Button
          component={Link}
          to={preSignedUrl}
          disabled={!preSignedUrl}
          variant="contained"
          sx={{ width: 200 }}
          target="_blank"
          download={true}
          onClick={() => setIsDownloaded("Successful")}
        >
          {downLoading ? <CircularProgress size={27} /> : "Download"}
        </Button>
      </Stack>
      {isDownloaded === "Successful" && (
        <Alert severity="success">Success: File Downlaoded Successfully</Alert>
      )}
      {isDownloaded === "Unsuccessful" && (
        <Alert severity="error">Error: File Download Unsuccessful</Alert>
      )}
      {file && (
        <FilteredListRender
          filteredList={filteredList}
          handleDownload={handleDownload}
          selected={selected}
        />
      )}
    </div>
  );
};
export default Download;

/**
 * FilteredListRender renders a list of the files fetched from from an API which user can click on and download it to local machine.
 *
 * @returns {JSX.Element} - FilteredListRender Fragment
 */
const FilteredListRender = ({ filteredList, handleDownload, selected }) => {
  return (
    <>
      <Typography variant="body1" align="left" className="p-2">
        Total Results : {filteredList.length}
      </Typography>
      {filteredList.map((item, index) => (
      <FormControlLabel
        key={index}
        value={item}
        className="w-full p-2"
        control={
          <Checkbox
            checked={selected === item}
            onChange={() => handleDownload(item)}
          />
        }
        label={
          <span>
            {item} <FileCopyOutlined />
          </span>
        }
      />
      ))}
    </>
  );
};
