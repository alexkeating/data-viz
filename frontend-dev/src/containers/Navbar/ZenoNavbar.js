import React from 'react';
import { Navbar, NavItem, MenuItem, NavDropdown, Nav } from 'react-bootstrap';
import url from './database.svg';

class ZenoNavbar extends React.Component {
    constructor(){
        super();
        this.dashboardRedirectUrl = this.dashboardRedirectUrl.bind(this);
    }

    dashboardRedirectUrl () {
        const highest_id = Math.max(...Object.keys(this.props.dashboards).map(key => parseInt(key)));
        return `dashboard/${highest_id+1}`;
    }

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
                            {
                                Object
                                    .keys(this.props.dashboards)
                                    .map(key => <MenuItem key={key} href={"/dashboard/" + key}>
                                                {this.props.dashboards[key].name}
                                                </MenuItem>)
                            }
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem onClick={ this.props.createDashboard(this.props.dashboardId)} href={'/' + this.dashboardRedirectUrl()}>
                            Add Dashboard
                        </NavItem>
                        <Navbar.Brand href="#">
                            <img src={url} role="presentation"/>
                        </Navbar.Brand>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default ZenoNavbar;
