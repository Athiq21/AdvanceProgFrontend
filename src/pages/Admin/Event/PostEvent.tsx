
import { PhotoCamera } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import { useState } from "react";
import CancelButtons from "../../../common/Component/Button/Cancel/CancelButtons";
import AddButtons from "../../../common/Component/Button/Add/AddButtons";
import { createEvent } from "../../../Service/CustomHook/createEvent";

const PostEvent = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setPhoto(file);
      setPhotoURL(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async () => {
    try {
      const eventData = {
        blob: photo,
      };
      await createEvent(eventData);
      handleCancel();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleCancel = () => {
    setPhoto(null);
    setPhotoURL(null);
  };

  return (
    <Container
      sx={{
        width: { xs: '300%', sm: 'auto' },
        marginLeft:{xs:'-70px'},
        backgroundColor: "#F1F1F1",
        borderRadius: 5,
        marginTop: 0,
        boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.1)",
        padding: { xs: 2, sm: 4 },
      }}
    >
      <Typography
        textAlign={"center"}
        gutterBottom
        sx={{ fontSize: { xs: "16px", sm: "20px" }, color: "#263B4A", paddingBottom: "10px", paddingTop: "20px" }}
      >
        Post Your Items
      </Typography>
      <Box
        sx={{
          height: { xs: "200px", sm: "200px" },
          marginLeft: "auto",
          marginRight: "auto",
          position: "relative",
          width: { xs: "100%", sm: "400px" },
          backgroundImage: photoURL ? `url(${photoURL})` : "none", // Set the background image
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px dashed #ccc",
          borderRadius: "8px",
          "&:hover .upload-button": {
            display: "flex",
          },
          "& .upload-button": {
            display: photoURL ? "none" : "flex", // Hide button if image is selected
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <Button
          className="upload-button"
          sx={{
            color: "white",
            backgroundColor: "#656565",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
          variant="contained"
          component="label"
          startIcon={<PhotoCamera />}
          fullWidth
        >
          Upload Photo
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </Button>
      </Box>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "flex-end",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <CancelButtons onClick={handleCancel}>Cancel</CancelButtons>
        <AddButtons sx={{height:40}} onClick={handleSubmit} text={"Submit"}>
          Submit
        </AddButtons>
      </Box>
    </Container>
  );
};

export default PostEvent;
