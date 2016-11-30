import React from 'react';
import { Navbar, NavItem, MenuItem, NavDropdown, Nav } from 'react-bootstrap';

class ChartNavbar extends React.Component {
    render() {
        return (
            <Nav activeKey="1" onSelect={this.handleSelect} className="nav-pills white-bg text-black">
                <NavItem eventKey="1" href="/">Query</NavItem>
                <NavItem eventKey="2" href="/settings">Settings</NavItem>
                <NavItem eventKey="3" href="/series">Series</NavItem>
            </Nav>
        )
    }
}

export default ChartNavbar;