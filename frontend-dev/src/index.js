import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store';

import './css/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import PeriscopeApp from './containers/PeriscopeApp'
import EditorApp from './containers/EditorApp/EditorApp';
import DashboardApp from './containers/DashboardApp/DashboardApp';
import Error from './containers/Error/Error';

const store = configureStore();

const Root = () => {
  return (
      <Provider store={store}>
          <BrowserRouter>
              <PeriscopeApp />
          </BrowserRouter>
      </Provider>

  )
};

render(
    <Root/>,
    document.getElementById('root')
);
