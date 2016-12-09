import React, { Component } from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap'
import Editor from '../Editor/Editor';
import DisplayJsonTable from '../DisplayJsonTable/DisplayJsonTable';
import ZenoNavbar from '../Navbar/ZenoNavbar';
import ChartNavbar from '../ChartNavbar/ChartNavbar';
import Table from '../Table/Table';
import Select from 'react-select';
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
        this.changeYValue = this.changeYValue.bind(this);
        this.changeXValue = this.changeXValue.bind(this);
        this.changeTypeValue = this.changeTypeValue.bind(this);
        this.postNewQuery = this.postNewQuery.bind(this);
        this.getQuery = this.getQuery.bind(this);

        this.state = {
            results: [],
            querystring: '',
            showTable: false,
            x: '',
            y: '',
            query: {},
            chartType: '',
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
                querystring: json.query.querystring,
            }))

    }

    handleChange(event) {
        this.setState({querystring: event.target.value});
    }

     changeYValue(value) {
        this.setState({y: value.value});
    }

    changeXValue(value) {
        this.setState({x: value.value});
    }

    changeTypeValue(value) {
        this.setState({chartType: value.value});
    }


    render() {
        let activeComponent;
        switch (this.state.activeMenuKey) {

            case "1": {
                      activeComponent = (
                     <Editor
                         sendRequest={this.postQuerystring}
                         handleChange={this.handleChange}
                         querystring={this.state.querystring}
                         saveQuerystring={this.postNewQuery()}
                     />
                );
                break;
            }

            case "2": {
                    activeComponent = (
                        <div>
                            <h5>Y Axis</h5>
                            <Select name="form-field-name"
                                    value={this.state.y}
                                    options={Object.keys(this.state.results[0]).map((key) => {return {'value': key, 'label': key}})}
                                    onChange={this.changeYValue}/>
                             <h5>X Axis</h5>
                            <Select name="form-field-name"
                                    value={this.state.x}
                                    options={Object.keys(this.state.results[0]).map((key) => {return {'value': key, 'label': key}})}
                                    onChange={this.changeXValue}/>
                            <h5>Chart Type</h5>
                            <Select name="form-field-name"
                                    value={this.state.chartType}
                                    options={['Line', 'Bar', 'Table'].map((key, index) => {return {'value': index, 'label': key}})}
                                    onChange={this.changeTypeValue}/>
                        </div>
                    )
                }
                break;
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
                <div className="container pre-scrollable">
                    {this.state.showTable ?  <DisplayJsonTable results={this.state.results}/> : <span />}
                </div>
            </div>
        )
    }
}

export default EditorApp;
