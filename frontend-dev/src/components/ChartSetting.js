import React from 'react';
import ChartNavbar from './ChartNavbar';
import ZenoNavbar from './ZenoNavbar';

class ChartSetting extends React.Component {
    render() {
        return (
            <div>
                <ZenoNavbar />
                <div className="shift-content">
                    <ChartNavbar />
                    <table>
                        <tr>
                            test
                        </tr>

                    </table>
                </div>
            </div>

        )
    }
}

export default ChartSetting;
