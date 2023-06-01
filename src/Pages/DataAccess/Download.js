import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { axiosApiCall } from "../../Utils/API";
import axios from "axios";
import { Alert } from "@mui/material";
import { saveAs } from "file-saver";

const fileLink= "https://5u8lxhfkbj.execute-api.ca-central-1.amazonaws.com/download-era5-gars-data?username=rommelnuque05&filename=test_ericknuque_20230601000000.csv";
const Download = () => {
  const [file, setFile] = useState(null);
  const [fileInput, setFileInput] = useState(
    "test_ericknuque_20230601000000.csv"
  );
  const [isDownloaded, setIsDownloaded] = useState("undefined");

  const handleDownload = async () => {


    const endpoint ="https://5u8lxhfkbj.execute-api.ca-central-1.amazonaws.com/download-era5-gars-data";
    const username = "rommelnuque05";
    const filename = fileInput !== "" ? fileInput : "test_ericknuque_20230601000000.csv";
    const params = {
      username: username,
      filename: filename,
    };
    const queryString = new URLSearchParams(params).toString();
    const url = `${endpoint}?${queryString}`;
    console.log("url: ", url);

    const downloadFile =async (url, filename) => {
      fetch(url, {
        method: "GET",
        mode: 'no-cors',
      })
        .then((response) => {
          console.log(response.data);
          console.log(response.status);
          console.log(response.statusText);
          console.log(response.headers);
          console.log(response.config);
          const blob = new Blob([response.data], { type: response.headers['content-type'] });
          saveAs(blob, filename); // Save the blob as a file using the provided filename
          setIsDownloaded("Successful");
        })
        .catch((error) => {
          console.error('Error in file download:', error);
          setIsDownloaded("Unsuccessful");
        });
    };
    downloadFile(url, fileInput);
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
          name="password"
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
          >
            Download            
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

// const Download = () => {
//   const [file, setFile] = useState(false);
//   // const [inputValue, setInputValue] = useState("");

//   const handleDownload = () => {
//     const endpoint = 'https://5u8lxhfkbj.execute-api.ca-central-1.amazonaws.com/download-era5-gars-data';
//     const username = 'rommelnuque05';
//     const filename = 'test_ericknuque_20230601000000.csv';

//     const params = {
//       username: username,
//       filename: filename,
//     };

//     const queryString = new URLSearchParams(params).toString();
//     const url = `${endpoint}?${queryString}`;
//     fetch(url, {
//       method: "GET",
//       mode: "no-cors",
//     })
//       .then((response) => {
//         console.log(response);
//         response.json();
//       })
//       .then((data) => {
//         // Process the response data here
//         console.log("Fetch API in Download :", data);

//         // setFile(data);
//         console.log(file)
//       })
//       .catch((error) => {
//         // Handle any errors
//         console.error("Erro in Fetch API in Download :", error);
//       });
//   };
//   return (
//     <div className="items-center block p-2 m-0 text-center rounded-md shadow-lg bg-gray-50 ">
//       <Typography variant="body1">Download Data from AWS</Typography>
//       <Stack
//         paddingTop={2}
//         direction={{ xs: "column", sm: "row" }}
//         alignItems="center"
//         justifyContent="center"
//         spacing={4}
//       >

//           {/* <TextField
//             margin="normal"
//             required
//             sx={{ width: { xs: "auto", sm: 400 } }}
//             name="password"
//             label="Search a file to download…"
//             type="text"
//             onClick={(ev) => setInputValue(ev.target.value)}
//           /> */}

//         {file && (
//           <Button
//             variant="text"
//             component="label"
//             sx={{ width: 200, flexGrow: 1 }}
//           >
//             {file}
//           </Button>
//         )}
//         <Button
//           variant="contained"
//           onClick={handleDownload}
//           component="label"
//           sx={{ width: 200 }}
//         >
//           Download
//         </Button>
//       </Stack>
//     </div>
//   );
// };

export default Download;
