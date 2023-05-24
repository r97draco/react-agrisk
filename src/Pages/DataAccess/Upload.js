import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isUploaded, setIsUploaded] = useState("undefined");
  const [isSelected, setIsSelected] = useState(false);

  const changeHandler = (event) => {
    if (event?.target?.files.length > 0){
      setSelectedFile(event.target.files[0]);
      setIsSelected(true);
    }
    else {
      setIsSelected(false);
    }
  };
  const FileDetails =()=>{
    return <div className="m-2">
    <p>Filename: {selectedFile.name}</p>
    <p>Filetype: {selectedFile.type}</p>
    <p>Size in bytes: {selectedFile.size}</p>
  </div>
  }
  const handleSubmission = () => {
    const formData = new FormData();

    formData.append("File", selectedFile);

    fetch("https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>", {
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
    <div className="items-center block m-3 text-center rounded-md backdrop-blur-md">
      <Typography variant="body1">Upload Data to AWS</Typography>
      {isSelected && <FileDetails/>}
      <Stack paddingTop={2} direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="center" spacing={2}>
        <TextField
          margin="normal"
          required
          accept="*" multiple
          onChange={(event)=>changeHandler(event)}
          sx={{width:{xs:"auto", sm:400}}}
          name="password"
          type="file"
        />
        <Button variant="contained" component="label" sx={{width:200}}>
          Upload
        </Button>
      </Stack>
    </div>
  );
};

export default Upload;

