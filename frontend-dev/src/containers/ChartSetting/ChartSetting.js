import React from 'react';
import ChartNavbar from '../ChartNavbar/ChartNavbar';
import ZenoNavbar from '../Navbar/ZenoNavbar';
import Table from '../Table/Table';

class ChartSetting extends React.Component {
    render() {
        return (
            <div>
                <ZenoNavbar />
                <div className="shift-content">
                    <ChartNavbar />
                    <Table columns={['Name','X Axis', 'Y Axis', 'Chart Type']}
                           rows={{'what': 'ho'}}/>
                </div>
            </div>

        )
    }
}

export default ChartSetting;
