import React from 'react';
import {BarChart, Legend, CartesianGrid, XAxis, YAxis, Bar, Tooltip} from 'recharts';

class BarGraph extends React.Component {
    render () {
        return (
            <BarChart width={300} height={200} data={this.props.data}>
                <XAxis dataKey={this.props.x}/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Bar dataKey={this.props.y} fill="#8884d8"/>
            </BarChart>)

    }
}

export default BarGraph;
