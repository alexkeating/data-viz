import React from 'react';
import ZenoNavbar from '../Navbar/ZenoNavbar';
import DisplayChart from '../DisplayChart/DisplayChart';
import {serverUrl} from '../../api';
import './dashboard_app.css';
// import '/node_modules/react-grid-layout/css/styles.css';
// import '/node_modules/react-resizable/css/styles.css';
import {findMaxId} from '../../helpers';
import _ from 'lodash';
// TODO
// css -modules, create react app with css-modules
// fix eslint modules, lodash _/fp
//         Put in live
//         Add Channels
//         react-grid-layout
//         add unique index on db name
//      7. Clean up styling
//      8. Make charts draggable

//  manageing fetch in the lifecycle asynchrounous stuff, errors in console?, reverse url
//     Redux/flux?
class DashboardApp extends React.Component {

    constructor (props) {
        super(props);
        this.getAllqueries = this.getAllqueries.bind(this);


        this.state = {
            clicked: false,
            inputClass: 'title-unselected',
            queries: {0: {}},

        };
    }

    componentWillMount () {
        this.getAllqueries();

    }

     getAllqueries () {

        const {dashboardId} = this.props.params;
        const url = `${serverUrl}/api/v1/dashboard/${dashboardId}/query/`;

        fetch(url)
            .then(response => response.json())
            .then(json => this.setState({
                queries:  json,
            }))
            .catch((error) => console.log(error))

    }

    clickChanged(click) {
            this.props.postNewDashboard(this.props.params.dashboardId)
    }


    render() {
        const currentDashboard = _.get(
            this.props.dashboards,
            this.props.params.dashboardId,
            { name: 'Untitled Dashboard' }
        );

        return (
            <div className="container">
                <div className="row shift-content text-black">
                    <input type="text" value={currentDashboard.name}
                           className={this.state.inputClass}
                           onChange={(e) => this.props.dataChanged(e, this.props.params.dashboardId)}
                           onBlur={() => this.clickChanged('false')}/>
                    <a href={`${this.props.params.dashboardId}/query/${findMaxId(this.state.queries) + 1}/`}
                       className="btn btn-default pull-right button-add-query">
                        <span>Add Query</span>
                    </a>
                </div>
                <div className="container white-bg">
                    {
                        Object.keys(this.state.queries)
                               .map(key => <DisplayChart key={key}
                                                         results={this.state.queries[key].results}
                                                         queryId={key}
                                                         x={this.state.queries[key].x}
                                                         y={this.state.queries[key].y}
                                                         chartType={this.state.queries[key].chart_type}
                                                         dashboard={this.state.queries[key].dashboard}/>)
                    }
                </div>
            </div>
        )
    }

}

export default DashboardApp;