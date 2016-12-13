import React from 'react';
import './database.css'

class Database extends React.Component {
    constructor () {
        super();
        this.saveDatabase = this.saveDatabase.bind(this)
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            database: {},
            displayName: '',
            databaseType: '',
            databaseName: '',
            databaseHost: '',
            databasePort: '',
            databaseUsername: '',
            databasePassword: '',

        }
    }

    saveDatabase () {
        const database = {'display_name': this.state.displayName, 'database_type': this.state.databaseType,
                          'database_name': this.state.databaseName, 'database_host': this.state.databaseHost,
                          'database_port': this.state.databasePort, 'database_username': this.state.databaseUsername,
                          'database_password': this.state.databasePassword};
        this.setState({
            database: database
        });
        this.props.postNewDatabase(database)
    }

    handleChange(event, state) {
        switch (state) {
            case 'displayName': {
                this.setState({displayName: event.target.value});
                break;
            }
            case 'databaseType': {
                this.setState({databaseType: event.target.value});
                break;
            }
            case 'databaseName': {
                this.setState({databaseName: event.target.value});
                break;
            }
            case 'databaseHost': {
                this.setState({databaseHost: event.target.value});
                break;
            }
            case 'databasePort': {
                this.setState({databasePort: event.target.value});
                break;
            }
            case 'databaseUsername': {
                this.setState({databaseUsername: event.target.value});
                break;
            }
            case 'databasePassword': {
                this.setState({databasePassword: event.target.value});
                break;
            }

        }

    }

    render () {
        return (
            <div className="row shift-content black-text white-bg">
                <div className="col-md-12 text-center">
                    <form method="post">
                        <table className="table-responsive">
                            <tr>
                                <td>Display Name</td>
                                <td>
                                    <input type="text" onChange={(e) => this.handleChange(e,'displayName')}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Database Type</td>
                                <td>
                                    <input type="text" onChange={(e) => this.handleChange(e, 'databaseType')}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Database Name</td>
                                <td>
                                    <input type="text" onChange={(e) => this.handleChange(e, 'databaseName')}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Database Host</td>
                                <td>
                                    <input type="text" onChange={(e) => this.handleChange(e, 'databaseHost')}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Database Port</td>
                                <td>
                                    <input type="number" onChange={(e) => this.handleChange(e, 'databasePort')}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Database Username</td>
                                <td>
                                    <input type="text" onChange={(e) => this.handleChange(e, 'databaseUsername')}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Database Password</td>
                                <td>
                                    <input type="password" onChange={(e) => this.handleChange(e, 'databasePassword')}/>
                                </td>
                            </tr>
                        </table>
                        <button className="btn btn-default" type="submit" onClick={this.saveDatabase}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Database;