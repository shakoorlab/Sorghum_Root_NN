import React, { useState } from "react";
import initialImageSrc from "../assets/add-image1.png";
import { useMaskData } from "../context/MaskDataContext.jsx"; //to populate values in MaskResults.jsx
import MaskResults from "./MaskResults";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import axios from "axios";

function GenerateMask() {
  const { maskData, setMaskData } = useMaskData(); //to populate values in MaskResults.jsx
  const [imageSrc, setImageSrc] = useState(initialImageSrc); //used for template image
  const [isImageSelected, setIsImageSelected] = useState(false); //  state to track if a user has selected an image
  const [imageFile, setImageFile] = useState(null); // state to hold the file object
  const [isLoading, setIsLoading] = useState(false);
  const [isMaskDataReady, setIsMaskDataReady] = useState(false); // state to track if mask data is ready to display

  function handleFileChange(event) {
    const files = event.target.files;
    const file = files[0];
    if (file) {
      const newImageSrc = URL.createObjectURL(file);
      setImageSrc(newImageSrc);
      setIsImageSelected(true); // Indicate that an image has been selected
      setImageFile(file); // Store the file object
    }
  }

  //*----------------------------SEARCH FILE SYSTEM/DRAG-DROP CAPABILITIES---------------------
  function handleDrop(e) {
    e.preventDefault(); // Prevent default behavior (Prevent file from being opened)

    if (e.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < e.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (e.dataTransfer.items[i].kind === "file") {
          var file = e.dataTransfer.items[i].getAsFile();
          console.log("... file[" + i + "].name = " + file.name);
          // Process the file as needed: display preview, upload, etc.
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (var i = 0; i < e.dataTransfer.files.length; i++) {
        console.log(
          "... file[" + i + "].name = " + e.dataTransfer.files[i].name
        );
        // Process the file(s) as needed
      }
    }

    // Pass event to handleFileChange for further processing
    handleFileChange({ target: { files: e.dataTransfer.files } });
  }
  //*--------------------------------------------------------------------------------------------------
  //
  //
  //?--------------------FOR SUBMITTING PICTURES TO BACKEND/RECEIVING MASK DATA---------------------------------------------
  async function handleSubmit() {
    if (!imageFile) return; // Check if file is not selected
    setIsLoading(true); // Show loading indicator
    const formData = new FormData();
    formData.append("image", imageFile, imageFile.name); // Append file to form data under the key 'image'

    try {
      //first API POST call to send image to database
      const response = await axios.post("/api/datasets/1/images/", formData, {
        headers: {
          Authorization: process.env.REACT_APP_AUTHORIZATION,
          accept: "application/json",
          "X-CSRFTOKEN": process.env.REACT_APP_CSRFTOKEN,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        console.log("Success:", "Image successfully uploaded.");
        console.log("Response Data:", response.data);

        const imageId = response.data.id;

        // Second API call to request the mask generation (this request triggers the mask generation)
        await axios.post(
          `/api/datasets/1/images/${imageId}/masks/`,
          {},
          {
            headers: {
              Authorization: process.env.REACT_APP_AUTHORIZATION,
              accept: "application/json",
              "X-CSRFTOKEN": process.env.REACT_APP_CSRFTOKEN,
            },
          }
        );

        // Function to poll for mask data
        const pollForMaskData = async () => {
          try {
            const maskDataResponse = await axios.get(
              `/api/datasets/1/images/${imageId}/masks/`,
              {
                headers: {
                  Authorization: process.env.REACT_APP_AUTHORIZATION,
                  accept: "application/json",
                  "X-CSRFTOKEN": process.env.REACT_APP_CSRFTOKEN,
                },
              }
            );

            if (maskDataResponse.data.length > 0) {
              // Assuming that the data array being non-empty means mask data is ready
              setMaskData({
                ...maskDataResponse.data[0], //saving the data to context to populate MaskResults.jsx
                imageUrl: maskDataResponse.data[0].image, // Assuming 'image' is the key for the image URL
              });
              setIsMaskDataReady(true); // Set the state to true when data is ready
              setIsLoading(false); // Hide loading indicator when done
            } else {
              setTimeout(pollForMaskData, 15000); // Poll every 5 seconds if data not ready
              console.log("Waiting for mask data");
            }
          } catch (error) {
            console.error("Polling error:", error);
            setIsLoading(false); // Hide loading indicator when done
          }
        };

        // Start polling
        pollForMaskData();
      } else {
        console.error("Upload failed:", response.status, response.data);
        setIsLoading(false); // Hide loading indicator when done
      }
    } catch (error) {
      if (error.response) {
        console.error(
          "HTTP error:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        setIsLoading(false); // Hide loading indicator when done
      } else {
        console.error("Error:", error.message);
        setIsLoading(false); // Hide loading indicator when done
      }
    }
  }
  //?---------------------------------------------------------------------------------------------------
  return (
    <>
      {/* //* grid starts for image analysis */}
      <div className="content-wrapper">
        <div className="grid-container">
          <div className="left-box-container">
            <div className="left-box">
              <h1>Analyze Root Architecture</h1>
            </div>
            <div className="bottom-left-box">
              {isMaskDataReady ? (
                <MaskResults /> // Display MaskResults when data is ready
              ) : (
                <p>Detect the roots present in your photo</p> // Otherwise, show this
              )}
            </div>
          </div>
          <div className="right-box-container">
            <div
              className="right-box"
              onClick={() => document.getElementById("fileInput").click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/jpeg, image/jpg, image/png"
              />
              {!isMaskDataReady &&
                (isImageSelected ? (
                  <img
                    src={imageSrc}
                    alt="Uploaded Root Image"
                    className="add-image"
                  />
                ) : (
                  <>
                    <img
                      src={initialImageSrc}
                      alt="Placeholder"
                      className="add-image"
                    />
                    <h2>Browse or drag and drop your root image</h2>
                    <h3>File must be a JPG, JPEG, or PNG</h3>
                  </>
                ))}
              {isMaskDataReady && (
                <img
                  src={maskData.imageUrl}
                  alt="Masked Image"
                  className="add-image"
                />
              )}
            </div>
            {isImageSelected && (
              <div className="button-container">
                <button className="generate-mask-btn" onClick={handleSubmit}>
                  Generate Mask
                </button>
                <button className="reset-btn">Reset Image</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default GenerateMask;
