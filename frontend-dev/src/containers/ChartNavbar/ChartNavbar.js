import React from 'react';
import { Navbar, NavItem, MenuItem, NavDropdown, Nav } from 'react-bootstrap';

const ChartNavbar = ({ activeKey, handleSelect }) => (
    <Nav activeKey={activeKey} onSelect={handleSelect} className="nav-pills text-black white-bg">
        <NavItem eventKey="1">Query</NavItem>
        <NavItem eventKey="2">Settings</NavItem>
    </Nav>
);

ChartNavbar.defaultProps = {
    activeKey: "1",
};

ChartNavbar.propTypes = {
    activeKey: React.PropTypes.string,
    handleSelect: React.PropTypes.func.isRequired,
};

export default ChartNavbar;