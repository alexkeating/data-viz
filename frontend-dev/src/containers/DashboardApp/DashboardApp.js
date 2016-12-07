import React from 'react';
import ZenoNavbar from '../Navbar/ZenoNavbar';
import DisplayTable from '../DisplayTable/DisplayTable';
import LineGraph from '../LineGraph/LineGraph';
import './dashboard_app.css'
import {findMaxId} from '../../helpers';
import _ from 'lodash';
// TODO
//      2. Hook up query button to redirect create adn save a query - done
//      3. Display _Table2 - done
//      4. Refactor to create periscope component
//      5. Create an App.js to be DRY
//      6. Support line and bar charts
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
        this.props.getAllDashboards(this.props.params.dashboardId);
        this.getAllqueries();

    }

     getAllqueries () {

        const {dashboardId} = this.props.params;
        const url = `http://127.0.0.1:8000/api/v1/dashboard/${dashboardId}/query/`;

        fetch(url)
            .then(response => response.json())
            .then(json => this.setState({
                queries:  json,
            }))
            .catch((error) => console.log(error))

    }

    clickChanged(click) {
        // data = { description: "New validated text comes here" }
        // Update your model from here

            this.props.postNewDashboard(this.props.params.dashboardId)

    }


    render() {
        const currentDashboard = _.get(
            this.props.dashboards,
            this.props.params.dashboardId,
            { name: 'Unitled Dashboard' }
        );
        console.log(this.props.dashboards, this.props.params.dashboardId);
        return (
            <div className="container">
                <ZenoNavbar dashboards={this.props.dashboards}
                            createDashboard={this.props.postNewDashboard}
                            dashboardId={this.props.params.dashboardId}/>
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
                <div className="container">
                    {
                        Object.keys(this.state.queries)
                               .map(key => <DisplayTable key={key}
                                                         results={this.state.queries[key].results}
                                                         queryId={key}
                                                         dashboardId={this.state.queries[key].dashboard}/>)
                    }
                </div>
                <div className="container white-bg">
                    {
                        Object.keys(this.state.queries)
                               .map(key => <LineGraph key={key}
                                                      data={[{'x': 1, 'y': 2}, {'x': 2, 'y': 7}]}/>)
                    }
                </div>
            </div>
        )
    }

}

export default DashboardApp;