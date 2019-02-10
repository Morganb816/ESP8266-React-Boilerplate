import { createStore, combineReducers, applyMiddleware } from 'redux';
import user from './reducers/auth';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const reducer = combineReducers({user});
const middleware = applyMiddleware(thunk, createLogger({collapsed: true}))

const store = createStore(reducer, middleware);

export default store;
export * from './reducers/auth';