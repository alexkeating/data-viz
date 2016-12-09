/**
 * Created by alexander on 26/11/2016.
 */
import React from 'react';
import JsonTable from 'react-json-table';
import url from './pencil.svg';


class DisplayJsonTable extends React.Component {
    constructor () {
        super ();
        this.limitArray = this.limitArray.bind(this);

    }

    limitArray (results) {
        let end = 0;
        if (results === undefined) {
            return results
        }
        if (results.length < 500) {
            end = results.length;
        }
        else {
            end = 500
        }

        return results.slice(0, end)

    }

    render () {
        return (
            <div className="container">
                <div className="container pre-scrollable">
                    <JsonTable className="table-bordered table-responsive white-bg text-black"
                               rows={this.limitArray(this.props.results)}/>
                </div>
                <div className="row">
                    <a className="btn btn-default" href={`${this.props.dashboardId}/query/${this.props.queryId}`}>
                        <span>Edit</span>
                    </a>
                </div>
            </div>
        );
    }
}

export default DisplayJsonTable;