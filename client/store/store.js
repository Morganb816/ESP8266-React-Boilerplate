import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const reducer = combineReducers({});
const middleware = applyMiddleware(thunk, createLogger({collapsed: true}))

const store = createStore(reducer, middleware);

export default store;