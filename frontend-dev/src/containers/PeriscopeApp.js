import React from 'react';
import { Match, Miss } from 'react-router';

import EditorApp from './EditorApp/EditorApp';
import ChartSetting from './ChartSetting/ChartSetting';
import DashboardApp from './DashboardApp/DashboardApp';
import Error from './Error/Error';

class PeriscopeApp extends React.Component {
    constructor () {
        super();
        this.getAllDashboards = this.getAllDashboards.bind(this);
        this.postNewDashboard = this.postNewDashboard.bind(this);
        this.dataChanged = this.dataChanged.bind(this);
        this.setDashboardName = this.setDashboardName.bind(this);

        this.state = {
             dashboards: {},
             dashboardName: 'Untitled Dashboard',
        };
    }

    getAllDashboards(dashboardId) {
        // breaks when you create a new dashboard

        const url = 'http://127.0.0.1:8000/api/v1/dashboard/';


        fetch(url)
            .then(response => response.json())
            .then(json => this.setState((prevState, props) => ({
                dashboards: json,
                dashboardName: json[dashboardId].name
            })))
            .catch((error) => console.log(error))
    }

    postNewDashboard(dashboardId) {
        // How do I make this more reusable
        // Is having the url params safe

        const url = 'http://127.0.0.1:8000/api/v1/dashboard/';
        const data = JSON.stringify({
            id: dashboardId,
            name: this.state.dashboardName,
        });

        fetch(url, {
            method: 'post',
            body: data,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .catch((error) => console.log(error))
    }

    setDashboardName (dashboardId) {
        if (Object.keys(this.state.dashboards).includes(dashboardId)) {
            debugger;
            this.setState({
                dashboardName: this.state.dashboards[dashboardId].name
            });
            return this.state.dashboardName
        }
        return this.state.dashboardName

    }

    dataChanged(event) {
        // data = { description: "New validated text comes here" }
        // Update your model from here
        console.log(event.target.value);
        this.setState({
            dashboardName: event.target.value,
        });
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
                                            setDashboardName: this.setDashboardName,
                                            dataChanged: this.dataChanged,
                                            name: this.state.dashboardName}}/>
                <MatchWithProps exactly pattern="/dashboard/:dashboardId/query/:queryId/"
                                component={EditorApp}
                                passProps={{dashboards: this.state.dashboards,
                                            getAllDashboards: this.getAllDashboards,
                                            postNewDashboard: this.postNewDashboard}}/>
                <Match exactly pattern="/settings" component={ChartSetting}/>
                <Miss component={Error}/>
            </div>
        )
    }
}

const MatchWithProps = ({ component:Comp, passProps, ...props}) => (
  <Match {...props} render={(matchedProps) => <Comp {...passProps} {...matchedProps} /> } />
);

export default PeriscopeApp;