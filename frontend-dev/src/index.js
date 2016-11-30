import React from 'react';
import { render } from 'react-dom';
import {  BrowserRouter, Match, Miss } from 'react-router';

import './css/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import EditorApp from './components/EditorApp';
import ChartSetting from './components/ChartSetting';
import NotFound from './components/NotFound';

const Root = () => {
  return (
    <BrowserRouter>
      <div>
          <Match exactly pattern="/" component={EditorApp}/>
          <Match exactly pattern="/settings" component={ChartSetting}/>
          <Miss component={NotFound}/>
      </div>
    </BrowserRouter>
  )
}

render(
    <Root/>,
    document.getElementById('root')
);
