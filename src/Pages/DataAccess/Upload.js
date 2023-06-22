import { CircularProgress, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Alert } from "@mui/material";
import axios from "axios";

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

    formData.append("File", selectedFile);
    console.log("FormData :", formData);
    const APIEndpoint =
      "https://hmtrekg8w0.execute-api.ca-central-1.amazonaws.com/upload-via-presigned-url";
    setLoading(true);
    const options = {
      url: APIEndpoint,
      method: "GET",
      // formData: formData,
      params: {
        username: "ericknuque",
        filename: selectedFile.name,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios(options);
      console.log(`Res`, response);
      if (response.status === 200) {
        console.log("GET Request Successful");
        let preSignedUrl = response.data["url"];
        console.log("preSignedUrl : ", preSignedUrl);
        let fields = response.data["fields"];
        formData.append("key", selectedFile.name);
        formData.append("x-amz-signature", fields["x-amz-signature"]);
        formData.append("x-amz-security-token", fields["x-amz-security-token"]);
        formData.append("x-amz-date", fields["x-amz-date"]);
        formData.append("x-amz-credential", fields["x-amz-credential"]);
        formData.append("x-amz-algorithm", fields["x-amz-algorithm"]);
        formData.append("policy", fields["policy"]);
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        try{
            axios.post(preSignedUrl, formData, config).then(response=>{
            console.log(response)
          }).catch(error=>{console.log(error)})
        //   const post_options = {
        //     method: "POST",
        //     url: preSignedUrl,
        //     key: selectedFile.name,
        //     ...fields,
        //     file: formData,
        //     headers: {
        //       "Content-Type": "multipart/form-data",
        //     },
        //   };
          // console.table(post_options);
          
          
          // const res = await axios(post_options);
          // console.log(`Res`, response);
          // if (res.status === 200) {
          //   console.log("POST Request Successful");
          //   setIsUploaded("Successful");
          // } else {
          //   console.error("POST Response is not 200 : ", res.status);
          //   setIsUploaded("Unsuccessful");
          // }
        } catch (error) {
          console.error("Error in accessing POST API: ", error);
          setIsUploaded("Unsuccessful");
        }
      } else {
        console.error("Response is not 200 : ", response.status);
        setIsUploaded("Unsuccessful");
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
