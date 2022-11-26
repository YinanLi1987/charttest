import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function NavBar(props) {

  
  
  return (
    <Navbar expand="lg" className="whole-nav">
      <Container>
        <Link className="nav-link" to="/" id="main-link">
          :C
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to="/">
              Atmospheric co2 and Temperatures
            </Link>
            <Link className="nav-link" to="/emissions">
              Emission Sources
            </Link>
            <Link className="nav-link" to="/user_specific">
                  Create Custom View
                </Link>
            <div>
              {props.userLoggedIn ? (
               <Link className="nav-link"  >
               Logout
              </Link>
              ) : (
                <Link className="nav-link" to="/login">
                  Login/Signup
                </Link>
              )}
            </div>
            <Button variant="light" className="nav-link">
              Light
            </Button>{" "}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
