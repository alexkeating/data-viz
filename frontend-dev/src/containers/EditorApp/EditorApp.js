import React, { Component } from 'react';
import Editor from '../Editor/Editor';
import DisplayTable from '../DisplayTable/DisplayTable';
import ZenoNavbar from '../Navbar/ZenoNavbar';
import ChartNavbar from '../ChartNavbar/ChartNavbar';
import 'whatwg-fetch';

import './editor_app.css'

class App extends Component {
    constructor() {
        super();

        this.sendRequest = this.sendRequest.bind(this);
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

    sendRequest(query) {
        let base_uri = 'http://127.0.0.1:8000/api/v1/querystring/?q_string=';
        let query_uri = base_uri.concat(query);

        fetch(query_uri, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    results: json.results,
                    showTable: true,
                })
            })
            .catch((error) => console.log(error))
    }

    postNewQuery() {
        // How do I make this more reusable
        // Is having the url params safe
        const {dashboardId, queryId} = this.props.params;
        const url = `http://127.0.0.1:8000/api/v1/dashboard/${dashboardId}/query/${queryId}`;
        const data = JSON.stringify({
            x: this.state.x,
            y: this.state.y,
            querystring: this.state.querystring,
        });

        fetch(url, {
            method: 'post',
            body: data,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .catch((error) => console.log(error))
    }

    getQuery () {
        const {dashboardId, queryId} = this.props.params;
        const url = `http://127.0.0.1:8000/api/v1/dashboard/${dashboardId}/query/${queryId}`;

        fetch(url)
            .then(response => response.json())
            .then(json => this.setState({
                query:  json,
                querystring: json.query.querystring,
            }))
            .catch((error) => console.log(error))

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
                    <Editor sendRequest={this.sendRequest} handleChange={this.handleChange}
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

export default App;
