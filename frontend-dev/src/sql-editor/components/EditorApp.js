import React, { Component } from 'react';
import Editor from './Editor';
import DisplayResults from './DisplayResults';
import ZenoNavbar from './ZenoNavbar';
import 'whatwg-fetch';

class App extends Component {
    constructor() {
        super();

        this.sendRequest = this.sendRequest.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            results: [],
            querystring: '',
            showTable: false,
        };
    }

    componentWillMount() {

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

    handleChange(event) {
        this.setState({querystring: event.target.value});

    }


    render() {
        return (
            <div className="btn-warning container-fluid">
                <div className="row">
                    <ZenoNavbar />
                </div>
                <div className="row shift-content">
                    <h1 className="text-center">Zeno</h1>
                    <Editor sendRequest={this.sendRequest} handleChange={this.handleChange}
                            query={this.state.querystring}/>
                </div>
                <span>Results: {this.state.results.length}</span>
                <div className="container pre-scrollable">
                    {this.state.showTable ?  <DisplayResults results={this.state.results}/> : <span />}
                </div>
            </div>
        );
    }
}

export default App;
