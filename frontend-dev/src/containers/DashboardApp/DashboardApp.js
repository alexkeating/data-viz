import React from 'react';
import ZenoNavbar from '../Navbar/ZenoNavbar';
import DisplayTable from '../DisplayTable/DisplayTable'
import './dashboard_app.css'
import {findMaxId} from '../../helpers';

// TODO
//      2. Hook up query button to redirect create adn save a query - done
//      3. Display _Table2 - done
//      4. Support line and bar charts
//      5. Create an App.js to be DRY
//      6. Clean up styling
//      7. Make charts draggable
//     Redux/flux?
class DashboardApp extends React.Component {

    constructor () {
        super();
        this.dataChanged = this.dataChanged.bind(this);
        this.postNewDashboard = this.postNewDashboard.bind(this);
        this.getAllDashboards = this.getAllDashboards.bind(this);
        this.getAllqueries = this.getAllqueries.bind(this);

        this.state = {
            name: 'Untitled Dashboard',
            clicked: false,
            inputClass: 'title-unselected',
            dashboards: {},
            queries: {0: {}},

        };
    }

    componentWillMount() {
        this.getAllDashboards();
        this.getAllqueries ();
    };

    postNewDashboard () {
        // How do I make this more reusable
        // Is having the url params safe

        const url = 'http://127.0.0.1:8000/api/v1/dashboard/';
        const { dashboardId } = this.props.params;
        const data = JSON.stringify({
            id: dashboardId,
            name: this.state.name,
        });

        fetch(url, {
            method: 'post',
            body: data,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .catch((error) => console.log(error))
    }

    getAllDashboards () {

        const url = 'http://127.0.0.1:8000/api/v1/dashboard/';
        const {dashboardId} = this.props.params;

        fetch(url)
            .then(response => response.json())
            .then(json => this.setState({
                dashboards:  json,
                name: json[dashboardId].name
            }))
            .catch((error) => console.log(error))

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

    dataChanged(event) {
        // data = { description: "New validated text comes here" }
        // Update your model from here
        console.log(event.target.value);
        this.setState({
            name: event.target.value,
        });
    }

    clickChanged(click) {
        // data = { description: "New validated text comes here" }
        // Update your model from here

        if (click === 'true') {
            console.log('click');
            this.setState({
                clicked: true,
                inputClass: 'title-selected'
            });

        }

        else {
            console.log('unclicked');
            this.setState({
                clicked: false,
                inputClass: 'title-unselected',
            });
            this.postNewDashboard()
        }

    }


    render() {
        return (
            <div className="container">
                <ZenoNavbar dashboards={this.state.dashboards} createDashboard={this.postNewDashboard()}/>
                <div className="row shift-content text-black">
                    <input type="text" value={this.state.name}
                           className={this.state.inputClass}
                           onChange={this.dataChanged}
                           onClick={() => this.clickChanged('true')}
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
            </div>
        )
    }

}

export default DashboardApp;