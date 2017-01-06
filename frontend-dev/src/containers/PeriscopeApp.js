import React from 'react';
import { Match, Miss } from 'react-router';
import { fetchDasboardsIfNeeded } from '../actions';

import EditorApp from './EditorApp/EditorApp';
import DashboardApp from './DashboardApp/DashboardApp';
import Database from './Database/Database';
import ZenoNavbar from './Navbar/ZenoNavbar';
import Error from './Error/Error';
import {api, serverUrl} from '../api';
import _ from 'lodash';
class PeriscopeApp extends React.Component {
    constructor () {
        super();
        // this.getAllDashboards = this.getAllDashboards.bind(this);
        this.getAllDatabases = this.getAllDatabases.bind(this);
        this.postNewDashboard = this.postNewDashboard.bind(this);
        this.postNewDatabase = this.postNewDatabase.bind(this);
        this.dataChanged = this.dataChanged.bind(this);

        this.state = {
             dashboards: {},
             databases: {},
        };
    }

     componentWillMount () {
         debugger;
         const { dispatch } = this.props;
         dispatch(fetchDasboardsIfNeeded());
         this.getAllDatabases();
     }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dashboards !== this.props.dashboards) {
            const {dispatch} = nextProps;
            dispatch(fetchDasboardsIfNeeded())
        }
    }

    // getAllDashboards() {
    //     const data = {dashboards: undefined};
    //     api('GET', `${serverUrl}/api/v1/dashboard/`, data)
    //         .then(response => response.json())
    //         .then(json => this.setState({
    //             dashboards: json,
    //         }))
    // }

    getAllDatabases() {
        const data = {dashboards: undefined};
        api('GET', `${serverUrl}/api/v1/database/`, data)
            .then(response => response.json())
            .then(json => this.setState({
                databases: json,
            }))
    }

    postNewDashboard(dashboardId, dashboardName='Untitled Dashboard') {
        if (!_.isEmpty(this.state.dashboards)) {
            api('POST', `${serverUrl}/api/v1/dashboard/`, {id: dashboardId, name: this.state.dashboards[dashboardId].name,})
        }
        if (dashboardId === undefined) {
            api('POST', `${serverUrl}/api/v1/dashboard/`, {id: '', name: dashboardName,})
        }
    }

    postNewDatabase(database) {
        if (!_.isEmpty(database)) {
            api('POST', `${serverUrl}/api/v1/database/`, {database: database})
            .then(response => response.json())
            .then(json => this.setState({
                databases: this.state.databases[json.id] = database
            }))
        }
    }

    dataChanged(event, dashboardId) {
        // data = { description: "New validated text comes here" }
        // Update your model from here
        console.log(event.target.value);
        const newState = {
            dashboards: {
                ...this.state.dashboards,
                [dashboardId]: {
                    ...this.state[dashboardId],
                    name: event.target.value
                }
            }
        };

        this.setState(newState);
    }

    render () {
        return (
            <div>
               <ZenoNavbar dashboards={this.state.dashboards}
                           createDashboard={this.postNewDashboard}
                           dashboardId="1"/>
                <Match exactly pattern="/" component={Database}/>
                <MatchWithProps exactly pattern="/database/create"
                                component={Database}
                                passProps={{postNewDatabase: this.postNewDatabase}}/>
                <MatchWithProps exactly pattern="/dashboard/:dashboardId/"
                                component={DashboardApp}
                                passProps={{dashboards: this.state.dashboards,
                                            getAllDashboards: this.props.dispatch(fetchDasboardsIfNeeded()),
                                            postNewDashboard: this.postNewDashboard,
                                            dataChanged: this.dataChanged}}/>
                <MatchWithProps exactly pattern="/dashboard/:dashboardId/query/:queryId/"
                                component={EditorApp}
                                passProps={{dashboards: this.state.dashboards,
                                            getAllDashboards: this.props.dispatch(fetchDasboardsIfNeeded()),
                                            postNewDashboard: this.postNewDashboard,
                                            databases: this.state.databases}}/>
                <Miss component={Error}/>
            </div>
        )
    }
}

const MatchWithProps = ({ component:Comp, passProps, ...props}) => (
  <Match {...props} render={(matchedProps) => <Comp {...passProps} {...matchedProps} /> } />
);

export default PeriscopeApp;