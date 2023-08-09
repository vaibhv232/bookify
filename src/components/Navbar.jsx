import React from 'react'

//*------------------CSS----------------------*//
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

const MyNavbar = () => {
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Bookify</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink className="navlinks" to="/"> Home</NavLink>
            <NavLink className="navlinks" to="/book/list" >Add Listing</NavLink>
            <NavLink className="navlinks" to="/book/orders" >Orders</NavLink>
          </Nav>
        </Container>
      </Navbar>

    </div>
  )
}

export default MyNavbar;