import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import './css/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import EditorApp from './containers/EditorApp/EditorApp';
import ChartSetting from './containers/ChartSetting/ChartSetting';
import DashboardApp from './containers/DashboardApp/DashboardApp';
import Error from './containers/Error/Error';

const Root = () => {
  return (
    <BrowserRouter>
      <div>
          <Match exactly pattern="/" component={EditorApp}/>
          <Match exactly pattern="/dashboard/:dashboardId/" component={DashboardApp}/>
          <Match exactly pattern="/dashboard/:dashboardId/query/:queryId/" component={EditorApp}/>
          <Match exactly pattern="/settings" component={ChartSetting}/>
          <Miss component={Error}/>
      </div>
    </BrowserRouter>
  )
}

render(
    <Root/>,
    document.getElementById('root')
);
