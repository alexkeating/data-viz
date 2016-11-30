import React from 'react';
import { Navbar, NavItem, MenuItem, NavDropdown, Nav } from 'react-bootstrap';

class ZenoNavbar extends React.Component {
    render() {
        return (
            <Navbar className="navbar-fixed-top">
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Zeno</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown eventKey={3} title="Dashboards" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Action</MenuItem>
                            <MenuItem eventKey={3.2}>Another action</MenuItem>
                            <MenuItem eventKey={3.3}>Something else here</MenuItem>
                            <MenuItem divider/>
                            <MenuItem eventKey={3.3}>Separated link</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem>Add Dashboard</NavItem>
                        <Navbar.Brand href="#">
                            <img src="/images/database.svg" />
                        </Navbar.Brand>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default ZenoNavbar;
