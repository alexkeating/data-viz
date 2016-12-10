import React from 'react';
import DisplayJsonTable from '../DisplayJsonTable/DisplayJsonTable';
import BarGraph from '../BarGraph/BarGraph';
import LineGraph from '../LineGraph/LineGraph';


class DisplayChart extends React.Component {
    render () {
        let displayChart;
        switch (this.props.chartType) {
            case 0: {
                displayChart = (<DisplayJsonTable data={this.props.results}
                                                  queryId={this.props.queryId}
                                                  dashboardId={this.props.dashboard}/>
                );
                break;
            }
            case 1: {
                displayChart = (
                    <LineGraph x={this.props.x}
                               y={this.props.y}
                               data={this.props.results}
                               queryId={this.props.queryId}/>
                );
                break;
            }
            case 2: {
                displayChart = (
                    <BarGraph  x={this.props.x}
                               y={this.props.y}
                               data={this.props.results}
                               queryId={this.props.queryId}/>
                );
                break;
            }
        }
        return (
            <div>
                {displayChart}
                 <div className="row">
                    <a className="btn btn-default" href={`${this.props.dashboard}/query/${this.props.queryId}`}>
                        <span>Edit</span>
                    </a>
                </div>
            </div>
        )
    }
}

export default DisplayChart;