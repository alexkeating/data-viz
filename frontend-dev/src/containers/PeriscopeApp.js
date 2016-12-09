import React from 'react';
import { Match, Miss } from 'react-router';

import EditorApp from './EditorApp/EditorApp';
import DashboardApp from './DashboardApp/DashboardApp';
import Error from './Error/Error';
import {api, serverUrl} from '../api';
import _ from 'lodash';
class PeriscopeApp extends React.Component {
    constructor () {
        super();
        this.getAllDashboards = this.getAllDashboards.bind(this);
        this.postNewDashboard = this.postNewDashboard.bind(this);
        this.dataChanged = this.dataChanged.bind(this);

        this.state = {
             dashboards: {},
        };
    }



    getAllDashboards(dashboardId) {
        const data = {dashboards: undefined};
        api('GET', `${serverUrl}/api/v1/dashboard/`, data)
            .then(response => response.json())
            .then(json => this.setState({
                dashboards: json,
            }))
    }

    postNewDashboard(dashboardId) {
        if (!_.isEmpty(this.state.dashboards)) {
            api('POST', `${serverUrl}/api/v1/dashboard/`, {id: dashboardId, name: this.state.dashboards[dashboardId].name,})
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
                <Match exactly pattern="/" component={EditorApp}/>
                <MatchWithProps exactly pattern="/dashboard/:dashboardId/"
                                component={DashboardApp}
                                passProps={{dashboards: this.state.dashboards,
                                            getAllDashboards: this.getAllDashboards,
                                            postNewDashboard: this.postNewDashboard,
                                            dataChanged: this.dataChanged}}/>
                <MatchWithProps exactly pattern="/dashboard/:dashboardId/query/:queryId/"
                                component={EditorApp}
                                passProps={{dashboards: this.state.dashboards,
                                            getAllDashboards: this.getAllDashboards,
                                            postNewDashboard: this.postNewDashboard}}/>
                <Miss component={Error}/>
            </div>
        )
    }
}

const MatchWithProps = ({ component:Comp, passProps, ...props}) => (
  <Match {...props} render={(matchedProps) => <Comp {...passProps} {...matchedProps} /> } />
);

export default PeriscopeApp;