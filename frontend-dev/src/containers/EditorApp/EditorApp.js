import React, { Component } from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap'
import Editor from '../Editor/Editor';
import DisplayJsonTable from '../DisplayJsonTable/DisplayJsonTable';
import ZenoNavbar from '../Navbar/ZenoNavbar';
import ChartNavbar from '../ChartNavbar/ChartNavbar';
import LineGraph from '../LineGraph/LineGraph';
import BarGraph from '../BarGraph/BarGraph'
import ChartSetting from '../ChartSetting/ChartSetting';
import _ from 'lodash';

import 'whatwg-fetch';

import {api, serverUrl} from '../../api';
import './editor_app.css'
import 'react-select/dist/react-select.css';

class EditorApp extends Component {
    constructor(props) {
        super(props);

        this.postQuerystring = this.postQuerystring.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.postNewQuery = this.postNewQuery.bind(this);
        this.getQuery = this.getQuery.bind(this);
        this.getAxisValues = this.getAxisValues.bind(this);

        this.state = {
            results: [],
            querystring: '',
            showTable: false,
            x: '',
            y: '',
            query: {},
            chartType: 0,
            activeMenuKey: "1",
        };
    }

    componentWillMount() {
        this.props.getAllDashboards(this.props.params.dashboardId);
        this.getQuery();
    }

    postQuerystring(query) {
        api('POST', `${serverUrl}/api/v1/querystring/?q_string=${query}`, undefined)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    results: json.results,
                    showTable: true,
                })
            })

    }

    postNewQuery() {
        const {dashboardId, queryId} = this.props.params;
        const data = {
            x: this.state.x,
            y: this.state.y,
            chart_type: this.state.chartType,
            querystring: this.state.querystring,
        };


        api('POST', `${serverUrl}/api/v1/dashboard/${dashboardId}/query/${queryId}`, data)

    }

    getQuery () {
        const {dashboardId, queryId} = this.props.params;

        const data = {dashboards: undefined};
        api('GET', `${serverUrl}/api/v1/dashboard/${dashboardId}/query/${queryId}`, data)
            .then(response => response.json())
            .then(json => this.setState({
                query:  json,
                x: json.query.x,
                y: json.query.y,
                chartType: json.query.chart_type,
                querystring: json.query.querystring,
            }))

    }

    getAxisValues (row) {
        let x;
        let y;
        let newRow = {};
        x = _.get(row, this.state.x);
        y = _.get(row, this.state.y);

        newRow[this.state.x] = x;
        newRow[this.state.y] = y;

        return newRow

    }

    handleChange(event) {
        this.setState({querystring: event.target.value});
    }

     changeValue(value) {
         switch (value.state) {
             case "y": {
                 this.setState({y: value.value});
                 break
             }
             case "x": {
                  this.setState({x: value.value});
                 break
             }
             case "chartType": {
                 this.setState({chartType: value.value});
             }
         }

    }


    render() {
        /// Set chart settings, whether it is a bar or line chart
        let activeComponent;
        switch (this.state.activeMenuKey) {

            case "1": {
                      activeComponent = (
                     <Editor
                         sendRequest={this.postQuerystring}
                         handleChange={this.handleChange}
                         querystring={this.state.querystring}
                         saveQuerystring={this.postNewQuery}
                     />
                );
                break;
            }

            case "2": {
                    activeComponent = (
                       <ChartSetting results={this.state.results[0]}
                                     y={this.state.y}
                                     x={this.state.x}
                                     chartType={this.state.chartType}
                                     changeValue={this.changeValue}/>
                    )
                }
                break;
        }

        ///Charts add bar and scatter, then swap editor in, add warning for failed sql, then django channels
        let chart;
        switch (this.state.chartType) {
            case 0: {
                chart = (
                    <div className="container pre-scrollable">
                        {this.state.results ? <DisplayJsonTable results={this.state.results}/> : <span />}
                    </div>
                );
                break;
            }
            case 1: {
                chart = (
                    <div className="white-bg">
                        {this.state.results ? <LineGraph y={this.state.y}
                                                         x={this.state.x}
                                                         data={this.state.results.map((row) =>
                                                             this.getAxisValues(row))}/>
                            : <span />}
                    </div>
                );
                break;
            }

            case 2: {
                chart = (
                    <div className="white-bg">
                        {this.state.results ? <BarGraph y={this.state.y}
                                                        x={this.state.x}
                                                        data={this.state.results.map((row) =>
                                                             this.getAxisValues(row))}/>
                            : <span />}
                    </div>
                );
                break;
            }
        }





        return (
            <div className="btn-warning container-fluid">
                <div className="row">
                    <ZenoNavbar dashboards={this.props.dashboards}
                                createDashboard={this.props.postNewDashboard}
                                dashboardId={this.props.params.dashboardId}/>
                </div>
                <div className="row shift-content">
                    <h1 className="text-center">Zeno</h1>
                    <ChartNavbar
                        handleSelect={(activeKey) => this.setState({ activeMenuKey: activeKey})}
                        activeKey={this.state.activeMenuKey}
                    />
                    <br/>
                    {activeComponent}
                </div>
                <span>Results: {this.state.results.length}</span>
                {chart}
            </div>
        )
    }
}

export default EditorApp;
