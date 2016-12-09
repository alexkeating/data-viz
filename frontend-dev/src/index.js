import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import './css/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import PeriscopeApp from './containers/PeriscopeApp'
import EditorApp from './containers/EditorApp/EditorApp';
import DashboardApp from './containers/DashboardApp/DashboardApp';
import Error from './containers/Error/Error';

const Root = () => {
  return (
    <BrowserRouter>
        <PeriscopeApp/>
    </BrowserRouter>
  )
}

render(
    <Root/>,
    document.getElementById('root')
);
