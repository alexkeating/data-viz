import React from 'react';
import { render } from 'react-dom';
import {  BrowserRouter, Match, Miss } from 'react-router';

import './css/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import EditorApp from './sql-editor/components/EditorApp';
import NotFound from './sql-editor/components/NotFound';

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={EditorApp} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}

render(
    <Root/>,
    document.getElementById('root')
);
