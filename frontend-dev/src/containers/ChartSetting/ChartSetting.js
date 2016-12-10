import React from 'react';
import Select from 'react-select';


class ChartSetting extends React.Component {



    render() {
        let chartStyle;
        switch (this.props.chartType) {
            case 1: {
                 chartStyle = (
                     <div>
                         <h5>Y Axis</h5>
                            <Select name="form-field-name"
                                    value={this.props.y}
                                    options={Object.keys(this.props.results).map((key) => {
                                        return {'value': key, 'label': key, 'state': 'y'}
                                    })}
                                    onChange={this.props.changeValue}/>
                         <h5>X Axis</h5>
                            <Select name="form-field-name"
                                    value={this.props.x}
                                    options={Object.keys(this.props.results).map((key) => {
                                        return {'value': key, 'label': key, 'state': 'x'}
                                    })}
                                    onChange={this.props.changeValue}/>
                     </div>);
                break;
            }

            case 2: {
                 chartStyle = (
                     <div>
                         <h5>Y Axis</h5>
                            <Select name="form-field-name"
                                    value={this.props.y}
                                    options={Object.keys(this.props.results).map((key) => {
                                        return {'value': key, 'label': key, 'state': 'y'}
                                    })}
                                    onChange={this.props.changeValue}/>
                         <h5>X Axis</h5>
                            <Select name="form-field-name"
                                    value={this.props.x}
                                    options={Object.keys(this.props.results).map((key) => {
                                        return {'value': key, 'label': key, 'state': 'x'}
                                    })}
                                    onChange={this.props.changeValue}/>
                     </div>);
                break;

            }

        }
        return (
            <div>
                <h5>Chart Type</h5>
                <Select name="form-field-name"
                        value={this.props.chartType}
                        options={['Table', 'Line', 'Bar'].map((key, index) => {
                            return {'value': index, 'label': key, 'state': 'chartType'}
                        })}
                        onChange={this.props.changeValue}/>
                {chartStyle}
            </div>
        )
    }
}

export default ChartSetting;
