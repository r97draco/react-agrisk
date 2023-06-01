import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Alert } from "@mui/material";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState();
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
  const handleSubmission = () => {
    const formData = new FormData();

    formData.append("File", selectedFile);
    console.log("FormData :",formData);
    // const APIEndpoint= 'https://fqvysvv7b4.execute-api.ca-central-1.amazonaws.com/upload-era5-gars-data?username="ericknuque"&filename="'+selectedFile.name+'"&content="ABC,DEF,XYZ"'
    const APIEndpoint= 'https://fqvysvv7b4.execute-api.ca-central-1.amazonaws.com/upload-era5-gars-data?username="ericknuque"&filename="test_ericknuque_20230601000001.csv"&content="ABC,DEF,XYZ"'
    fetch(APIEndpoint, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        setIsUploaded("Successful");
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsUploaded("Unsuccessful");
      });
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
          name="password"
          type="file"
        />
        <Button
          variant="contained"
          component="label"
          sx={{ width: 200 }}
          onClick={handleSubmission}
        >
          Upload
        </Button>
      </Stack>
      {isUploaded === "Successful" && (
        <Alert severity="success">Success: File Uploaded Successfully</Alert>
      )}
      {isUploaded === "Unsuccessful" && (
        <Alert severity="error">Error: Upload Unsuccessful</Alert>
      )}
    </div>
  );
};

export default Upload;
