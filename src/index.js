import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
import {Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import AsyncDispatchMiddleware from './middleware';

import './index.css';
import './monokai.css';

import HomePage from './scenes/Home';
import Playground from './scenes/Playground';

import registerServiceWorker from './registerServiceWorker';

import AppStore from './reducers';

import {act_init} from './actions';

const history = createHistory();
const middlewares = [AsyncDispatchMiddleware, routerMiddleware(history)];

let store = createStore(AppStore, applyMiddleware(...middlewares));
store.dispatch(act_init());

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div style={{display:'flex', flex:1}}>
            <Switch>
                <Route  path='/playground' component={Playground} />
                <Route  component={HomePage} />
            </Switch>
            </div>
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root')
    );
registerServiceWorker();
