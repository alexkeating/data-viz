import React from 'react'
import {LineChart, Line, CartesianGrid, XAxis, YAxis} from 'recharts'


class LineGraph extends React.Component {
    render () {
        return (
            <LineChart width={400} height={400} data={this.props.data}>
                <Line type="monotone" dataKey={this.props.y} stroke="#8884d8"/>
                <CartesianGrid stroke="#ccc"/>
                <XAxis dataKey={this.props.x}/>
                <YAxis />
            </LineChart>
        )
    }
}

export default LineGraph;