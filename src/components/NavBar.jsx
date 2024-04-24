import React from "react";
import "../App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import AvatarMenu from "./AvatarMenu";
import { useWindowWidth } from "../hooks/useWidth";

function NavBar() {
  const width = useWindowWidth();
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
              {width > 1000 && <AvatarMenu />}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      {/* //! navbar end */}
    </>
  );
}

export default NavBar;
