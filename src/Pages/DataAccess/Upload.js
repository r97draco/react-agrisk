import { CircularProgress, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Alert } from "@mui/material";
import axios from "axios";

const getRequest = async (selectedFile, setIsUploaded) => {
  const APIEndpoint =
    "https://hmtrekg8w0.execute-api.ca-central-1.amazonaws.com/upload-via-presigned-url";
  const options = {
    url: APIEndpoint,
    method: "GET",
    params: {
      username: "ericknuque",
      filename: selectedFile.name,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axios(options);
  console.log(`Res`, response);
  if (response.status === 200) {
    console.log("GET Request Successful");
  } else {
    console.error("Response is not 200 : ", response.status);
    setIsUploaded("Unsuccessful");
  }
  return response;
};

const postRequest = async (formData, get_response, setIsUploaded) => {
  let preSignedUrl = get_response.data["url"];
  console.log("preSignedUrl : ", preSignedUrl);
  let fields = get_response.data["fields"];
  try {
    const post_options = {
      method: "POST",
      url: preSignedUrl,
      ...fields,
      file: formData,
      "Content-Type": "multipart/form-data",
    };
    console.table(post_options);
    // console.log(JSON.stringify(post_options));
    const res = await axios(post_options);
    console.log(`Res`, res);
    if (res.status === 200) {
      console.log("POST Request Successful");
      setIsUploaded("Successful");
      return res.status;
    } else {
      console.error("POST Response is not 200 : ", res.status);
      setIsUploaded("Unsuccessful");
    }
  } catch (error) {
    console.error("Error in accessing POST API: ", error);
    setIsUploaded("Unsuccessful");
  }
};



/**
 * Upload Component renders a file input component to select the file from the device and enables uploading the file to an AWS server using an API.
 *
 * @returns {JSX.Element} - Upload Component
 */
const Upload = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [loading, setLoading] = useState(false);

  const [isUploaded, setIsUploaded] = useState("undefined");
  const [isSelected, setIsSelected] = useState(false);

  const changeHandler = (event) => {
    setIsUploaded("undefined");
    if (event?.target?.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  };
  const FileDetails = () => {
    return (
      <div className="m-2">
        <p>Filename: {selectedFile.name}</p>
        <p>Filetype: {selectedFile.type}</p>
        <p>Size in bytes: {selectedFile.size}</p>
      </div>
    );
  };
  const handleSubmission = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    setLoading(true);
    try {
      const get_response = await getRequest(selectedFile, setIsUploaded);
      if (get_response.status === 200) {
        await postRequest(formData, get_response, setIsUploaded);
      }
    } catch (error) {
      console.error("Error in accessing GET API: ", error);
      setIsUploaded("Unsuccessful");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="items-center block p-2 m-0 text-center rounded-md shadow-lg bg-gray-50 ">
      <Typography variant="body1">Upload Data to AWS</Typography>
      {isSelected && <FileDetails />}
      <Stack
        paddingTop={2}
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <TextField
          margin="normal"
          required
          accept="*"
          multiple
          onChange={(event) => changeHandler(event)}
          sx={{ width: { xs: "auto", sm: 400 } }}
          name="file"
          type="file"
        />
        <Button
          variant="contained"
          component="label"
          sx={{ width: 200 }}
          onClick={handleSubmission}
          disabled={!isSelected || loading}
        >
          {loading ? <CircularProgress size={27} /> : "Upload"}
        </Button>
      </Stack>
      {isUploaded === "Successful" && (
        <Alert severity="success">Success: File Uploaded Successfully</Alert>
      )}
      {isUploaded === "Unsuccessful" && (
        <Alert severity="error">Error: File Upload Unsuccessful</Alert>
      )}
    </div>
  );
};
export default Upload;


// const postRequest_version2 = async (formData, get_response, setIsUploaded) => {
//   let fields = get_response.data["fields"];
//   formData.append("key", fields["key"]);
//   formData.append("x-amz-signature", fields["x-amz-signature"]);
//   formData.append("x-amz-security-token", fields["x-amz-security-token"]);
//   formData.append("x-amz-date", fields["x-amz-date"]);
//   formData.append("x-amz-credential", fields["x-amz-credential"]);
//   formData.append("x-amz-algorithm", fields["x-amz-algorithm"]);
//   formData.append("policy", fields["policy"]);
//   const config = {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   };
//   axios
//     .post(get_response.data["url"], formData, config)
//     .then((res) => {
//       console.log(res);
//       if (res.status === 200) {
//         console.log("POST Request Successful");
//         setIsUploaded("Successful");
//         return res.status;
//       } else {
//         console.error("POST Response is not 200 : ", res.status);
//         setIsUploaded("Unsuccessful");
//       }
//     })
//     .catch((error) => {
//       console.error("Error in accessing POST API: ", error);
//       setIsUploaded("Unsuccessful");
//     });
// };