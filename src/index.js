/**
 * Copyright (c) 2018-present, A68, Inc.
 *
 * This source code is free
 */

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<BrowserRouter>
    <App />
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();