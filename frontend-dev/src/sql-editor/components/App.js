import React, { Component } from 'react';
import Editor from './Editor'
import 'whatwg-fetch'

class App extends Component {
    constructor() {
        super();

        this.sendRequest = this.sendRequest.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            results: [],
            querystring: '',
        };
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
                    <h1 className="text-center">Zeno</h1>
                </div>
                <Editor sendRequest={this.sendRequest} handleChange={this.handleChange}
                        query={this.state.querystring}/>
                <span>Results: {this.state.results.length}</span>
            </div>
        );
    }
}

export default App;
