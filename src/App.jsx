import "./App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      console.log(file);
      // Process the file as needed: display preview, upload, etc.
    }
  }
  return (
    //* component used from react bootstrap*/
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
                <Nav.Link href="#link">Images</Nav.Link>
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
              <p>Detect the roots present in your photo</p>
            </div>
          </div>
          <div
            className="right-box"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileChange} // Function to handle file selection
            />
            <img
              src="src/assets/add-image1.png" // Change path accordingly
              alt="Descriptive Text"
              className="add-image"
            />
          </div>
        </div>
      </div>

      {/* //! grid ends */}
    </>
  );
}

export default App;
