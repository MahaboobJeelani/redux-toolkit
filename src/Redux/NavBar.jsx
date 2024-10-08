import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const NavBar = () => {
    const counter = useSelector(state => state.cart)
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="#">React Redux Toolkit</Navbar.Brand>
                <Navbar.Collapse id="navbarScroll">
                    <Nav>
                        <Nav.Link to='/' as={Link}>Products</Nav.Link>
                    </Nav>
                    <Navbar.Toggle />
                </Navbar.Collapse>

                <Navbar.Collapse>
                    <Navbar.Text>
                        <Nav.Link to='/cart' as={Link}>Cart {counter.length}</Nav.Link >
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default NavBar
