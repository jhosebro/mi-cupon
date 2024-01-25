import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
    return (
        <Navbar className='amarillo' expand="lg">
            <Container>
                <Navbar.Brand style={{ color: '#2c2217' }} as={Link} to="/">Bono encantado</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/generator">Generar Cupón</Nav.Link>
                        <Nav.Link as={Link} to="/list">Lista de Cupones</Nav.Link> 
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
