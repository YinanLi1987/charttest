import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'


function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link className='nav-link' to="/">Climate Change Visualisation</Link>  
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className='nav-link' to="/">Atmospheric co2 and Temperatures</Link>
            <Link className='nav-link' to="/emissions">Emission Sources</Link>
            <Link className='nav-link' to="/user_specific">Create Custom View</Link>
            <Button variant="light" className='nav-link'>Light</Button>{' '}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;