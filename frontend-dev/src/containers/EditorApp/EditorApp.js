import React, { Component } from 'react';
import Editor from '../Editor/Editor';
import DisplayTable from '../DisplayTable/DisplayTable';
import ZenoNavbar from '../Navbar/ZenoNavbar';
import ChartNavbar from '../ChartNavbar/ChartNavbar';
import _ from 'lodash';
import 'whatwg-fetch';

import {api, serverUrl} from '../../api';
import './editor_app.css'

class EditorApp extends Component {
    constructor(props) {
        super(props);

        this.postQuerystring = this.postQuerystring.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.postNewQuery = this.postNewQuery.bind(this);
        this.getQuery = this.getQuery.bind(this);

        this.state = {
            results: [],
            querystring: '',
            showTable: false,
            x: '',
            y: '',
            query: {},
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


    render() {
        return (
            <div className="btn-warning container-fluid">
                <div className="row">
                    <ZenoNavbar dashboards={this.props.dashboards}
                                createDashboard={this.props.postNewDashboard}
                                dashboardId={this.props.params.dashboardId}/>
                </div>
                <div className="row shift-content">
                    <h1 className="text-center">Zeno</h1>
                    <ChartNavbar />
                    <br/>
                    <Editor sendRequest={this.postQuerystring} handleChange={this.handleChange}
                            querystring={this.state.querystring} saveQuerystring={this.postNewQuery()} />
                </div>
                <span>Results: {this.state.results.length}</span>
                <div className="container pre-scrollable">
                    {this.state.showTable ?  <DisplayTable results={this.state.results}/> : <span />}
                </div>
            </div>
        )
    }
}

export default EditorApp;
