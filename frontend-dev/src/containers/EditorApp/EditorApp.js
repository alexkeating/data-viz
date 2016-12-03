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
        this.getAllDashboards = this.getAllDashboards.bind(this);

        this.state = {
            results: [],
            querystring: '',
            showTable: false,
            dashboards: {},
        };
    }

    componentWillMount() {
        this.getAllDashboards();

        // check if there is any order in localStorage
        const localStorageRef = localStorage.getItem('query');

        if (localStorageRef) {
            // update our App component's order state
            this.setState({
                querystring: localStorageRef
            });
        }

    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('query', this.state.querystring)
    }


    sendRequest(query) {
        let base_uri = 'http://127.0.0.1:8000/api/v1/querystring?q_string=';
        let query_uri = base_uri.concat(query);
        const self = this;

        fetch(query_uri, {
            method: 'post',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(json => {
                self.setState({
                    results: json.results,
                    showTable: true,
                })
            })
            .catch((error) => console.log(error))
    }

    postNewDashboard () {
        // How do I make this more reusable
        // Is having the url params safe

        const url = 'http://127.0.0.1:8000/api/v1/dashboard';
        const dashboardId = Math.max(...Object.keys(this.props.dashboards).map(key => parseInt(key)));
        const data = JSON.stringify({
            id: dashboardId,
            name: this.state.name,
        });

        fetch(url, {
            method: 'post',
            body: data,
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .catch((error) => console.log(error))
    }

     getAllDashboards () {

        const url = 'http://127.0.0.1:8000/api/v1/dashboard';

        fetch(url)
            .then(response => response.json())
            .then(json => this.setState({
                dashboards:  json,
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
                    <ZenoNavbar dashboards={this.state.dashboards} createDashboard={this.postNewDashboard()}/>
                </div>
                <div className="row shift-content">
                    <h1 className="text-center">Zeno</h1>
                    <ChartNavbar />
                    <br/>
                    <Editor sendRequest={this.sendRequest} handleChange={this.handleChange}
                            query={this.state.querystring}/>
                </div>
                <span>Results: {this.state.results.length}</span>
                <div className="container pre-scrollable">
                    {this.state.showTable ?  <DisplayTable results={this.state.results}/> : <span />}
                </div>
            </div>
        );
    }
}

export default App;
