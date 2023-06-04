import { Typography } from "@material-ui/core";
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
  const [fileInput, setFileInput] = useState(
    "test_ericknuque_20230601000000.csv"
  );
  const [urlInput, setUrlInput] = useState("https://picsum.photos/200");
  const [isDownloaded, setIsDownloaded] = useState("undefined");

  const handleDownload = async () => {
    //-------------------------------------------------------------
    const endpoint = "https://h57y6aazo9.execute-api.ca-central-1.amazonaws.com/download-era5-gars-data";
    const username = "rommelnuque05";
    const filename = fileInput !== "" ? fileInput : "test_ericknuque_20230601000000.csv";
    const params = {
      username: username,
      filename: filename,
    };
    const queryString = new URLSearchParams(params).toString();
    const URL = `${endpoint}?${queryString}`;
    //-------------------------------------------------------------

    try {
      const response = await axios({
        url: URL,
        method: "GET",
        responseType: "blob",
      });      
      console.log(`Res`, response);
      let filename = "file";
      const contentDisposition = response.headers["content-disposition"];
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename=(.+)$/i);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      } else {
        // const urlSegments = url.split("/");
        // filename = urlSegments[urlSegments.length - 1];
        filename= fileInput !==""?fileInput: "file";
        // filename="file"
      }
      if (response.status ==200) {
        const blob = new Blob([response.data], {type: response.headers["content-type"],});
        saveAs(blob, filename);
      } else {
        console.error("Response is not OK:", response.status);
        throw new Error("Response is not OK");
      }
    } catch (error) {
      console.error("Error in file download:", error);
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
export default Download;

// const handleDownload = async ({ fileInput, setIsDownloaded }) => {
//   const endpoint =
//     "https://5u8lxhfkbj.execute-api.ca-central-1.amazonaws.com/download-era5-gars-data";
//   const username = "rommelnuque05";
//   const filename =
//     fileInput !== "" ? fileInput : "test_ericknuque_20230601000000.csv";
//   const params = {
//     username: username,
//     filename: filename,
//   };
//   const queryString = new URLSearchParams(params).toString();
//   const url = `${endpoint}?${queryString}`;
//   // console.log("url: ", url);
//   const testUrl =
//     "https://gist.githubusercontent.com/taterbase/2784890/raw/ee2f562a0dce92e922756b8411d4e1c0bcddb159/bin2string.js";
//   const downloadFile = async (url, filename) => {
//     await fetch(url, {
//       method: "GET",
//       mode: "no-cors",
//     })
//       .then((response) => {
//         console.table(response);
//         console.log(response);
//         console.log(response.config);
//         const blob = new Blob([response.data], {
//           type: response.headers["content-type"],
//         });
//         saveAs(blob, filename); // Save the blob as a file using the provided filename
//         setIsDownloaded("Successful");
//       })
//       .catch((error) => {
//         console.error("Error in file download:", error);
//         setIsDownloaded("Unsuccessful");
//       });
//   };
//   const gistUrl =
//     "https://api.github.com/gists/53e1780a5a68fe9281cfbbc9820d381f";
//   const gist = "https://gist.github.com/schacon/1";

//   const downloadGist = (url) => {
//     fetch(url)
//       .then((results) => {
//         console.log(results);
//         return results.json();
//       })
//       .then((data) => {
//         console.log(data.files["forgeLikeServerSetup.md"].content);
//         // console.log(data.files[filename].content);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//   // downloadFile(testUrl, fileInput);
//   // downloadGist(testUrl);
//   // downloadGist(gist);
//   downloadGist(gistUrl);
// };

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

