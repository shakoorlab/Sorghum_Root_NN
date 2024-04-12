import "./App.css";
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import MaskResults from "./components/MaskResults";

function App() {
  const [imageSrc, setImageSrc] = useState("src/assets/add-image1.png"); //used for template image
  const [isImageSelected, setIsImageSelected] = useState(false); //  state to track if a user has selected an image
  const [imageFile, setImageFile] = useState(null); // state to hold the file object

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
  //?--------------------FOR SUBMITTING PICTURES TO BACKEND---------------------------------------------
  async function handleSubmit() {
    if (!imageFile) return; // Check if file is not selected

    const formData = new FormData();
    formData.append("image", imageFile); // Append file to form data under the key 'image'

    // const token = "";
    // Encode your username and password
    const username = "";
    const password = "";
    const encodedCredentials = btoa(`${username}:${password}`);

    try {
      const response = await fetch(
        "http://3.15.232.18:8000/api/datasets/1/images/",
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${encodedCredentials}`,
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Network response was not ok.");

      const data = await response.json();
      console.log(data); // Process the response data as needed
    } catch (error) {
      console.error("Error:", error);
    }
  }
  //?---------------------------------------------------------------------------------------------------
  return (
    //* component used from https://react-bootstrap.netlify.app/docs/components/navbar/ */
    <>
      {/* navbar start */}
      <div className="navbar-container">
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src="src/assets/logo.png" //!change path
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
              RhizoRoot AI
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#home">Analyze</Nav.Link>
                <Nav.Link href="#link">Datasets</Nav.Link>
                <NavDropdown title="Docs" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">
                    Getting Started
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Neural Network
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Training
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Affiliates
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      {/* //! navbar end */}

      {/* //* grid starts for image analysis */}
      <div className="content-wrapper">
        <div className="grid-container">
          <div className="left-box-container">
            <div className="left-box">
              <h1>Analyze Root Architecture</h1>
            </div>
            <div className="bottom-left-box">
              {/* <p>Detect the roots present in your photo</p> */}
              <MaskResults />
            </div>
          </div>
          <div className="right-box-container">
            {" "}
            {/* New container */}
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
              <img
                src={imageSrc}
                alt="Uploaded Root Image"
                className="add-image"
              />
              {!isImageSelected && (
                <>
                  <h2>Browse or drag and drop your root image</h2>
                  <h3>File must be a JPG, JPEG, or PNG</h3>
                </>
              )}
            </div>
            {isImageSelected && (
              <div className="button-container">
                <button className="generate-mask-btn" onClick={handleSubmit}>
                  Generate Mask
                </button>
                <button className="reset-btn">Reset</button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* //! grid ends */}
    </>
  );
}

export default App;
