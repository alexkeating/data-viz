import React from 'react';
import { Match, Miss } from 'react-router';

import EditorApp from './EditorApp/EditorApp';
import ChartSetting from './ChartSetting/ChartSetting';
import DashboardApp from './DashboardApp/DashboardApp';
import Error from './Error/Error';
import {api, serverUrl} from '../api';

class PeriscopeApp extends React.Component {
    constructor () {
        super();
        this.getAllDashboards = this.getAllDashboards.bind(this);
        this.postNewDashboard = this.postNewDashboard.bind(this);
        this.dataChanged = this.dataChanged.bind(this);
        this.setDashboardName = this.setDashboardName.bind(this);
        this.changeState = this.changeState.bind(this);

        this.state = {
             dashboards: {},
             dashboardName: 'Untitled Dashboard',
        };
    }



    getAllDashboards(dashboardId) {
        api('GET', `${serverUrl}api/v1/dashboard/`, {dashboards: undefined},
            this.changeState)
    }

    postNewDashboard(dashboardId) {
        api('POST', `${serverUrl}api/v1/dashboard/`, {id: dashboardId, name: this.state.dashboardName,})
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

    changeState(json, data) {
        let newState = {};
        for (let [key, value] of Object.entries(data)) {
            // console.log(key + ':' + value);
            if (value != undefined) {
                newState[key] = json[value];
            }
            else {
                newState[key] = json
            }
        }
        this.setState(newState);
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