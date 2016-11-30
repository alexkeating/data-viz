/**
 * Created by alexander on 26/11/2016.
 */
import React from 'react'
import JsonTable from 'react-json-table'


class DisplayTable extends React.Component {

    render () {
        return (
            <JsonTable className="table-bordered table-responsive white-bg text-black"
                       rows={this.props.results.slice(0, 500)}/>
        );
    }
}

export default DisplayTable;