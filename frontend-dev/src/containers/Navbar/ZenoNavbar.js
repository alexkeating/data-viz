import React from 'react';
import { Navbar, NavItem, MenuItem, NavDropdown, Nav } from 'react-bootstrap';
import url from './database.svg';
import _ from 'lodash';

class ZenoNavbar extends React.Component {
    constructor(){
        super();
        this.dashboardRedirectUrl = this.dashboardRedirectUrl.bind(this);
    }

    dashboardRedirectUrl () {
        // const highest_id = Math.max(...Object.keys(this.props.dashboards).map(key => parseInt(key)));
        // return `dashboard/${highest_id+1}`;
        return `1`
    }

    render() {
        let dashboardList;
        if (!_.isEmpty(this.props.dashboards)) {
           dashboardList =  (Object.keys(this.props.dashboards)
                                   .map(key => <MenuItem key={key} href={"/dashboard/" + key}>
                                               {this.props.dashboards[key].name}</MenuItem>))
        }
        else {
            dashboardList = (<MenuItem>Empty</MenuItem>)
        }

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
                            {dashboardList}
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem onClick={this.props.createDashboard(this.props.dashboardId)} href={'/' + this.dashboardRedirectUrl()}>
                            Add Dashboard
                        </NavItem>
                        <a href="/database/create">
                            <Navbar.Brand>
                                <img src={url} role="presentation"/>
                            </Navbar.Brand>
                        </a>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default ZenoNavbar;
