import React from 'react';
import './database.css'

class Database extends React.Component {
    render () {
        return (
            <div className="row shift-content black-text white-bg">
                <div className="col-md-12 text-center">
                    <form method="post">
                        <table className="table-responsive">
                            <tr>
                                <td>Display Name</td>
                                <td>
                                    <input type="text"/>
                                </td>
                            </tr>
                            <tr>
                                <td>Database Type</td>
                                <td>
                                    <input type="text"/>
                                </td>
                            </tr>
                            <tr>
                                <td>Database Name</td>
                                <td>
                                    <input type="text"/>
                                </td>
                            </tr>
                            <tr>
                                <td>Database Host</td>
                                <td>
                                    <input type="text"/>
                                </td>
                            </tr>
                            <tr>
                                <td>Database Port</td>
                                <td>
                                    <input type="text"/>
                                </td>
                            </tr>
                            <tr>
                                <td>Database Username</td>
                                <td>
                                    <input type="text"/>
                                </td>
                            </tr>
                            <tr>
                                <td>Database Password</td>
                                <td>
                                    <input type="password"/>
                                </td>
                            </tr>
                        </table>
                        <button className="btn btn-default">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Database;