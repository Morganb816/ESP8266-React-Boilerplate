import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { history } from './history';
import store from './store/store';
import './scss/index.scss';
import {Main} from './main';

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Main />
        </Router>
    </Provider>,
    document.getElementById('app'),
)