import {applyMiddleware, compose, createStore} from 'redux';
import {createEpicMiddleware} from 'redux-observable';

import rootReducer from './reducers/index';
import rootEpic from './epics/index';

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const epicMiddleware = createEpicMiddleware();

console.log(process.env.NODE_ENV);
console.log(composeEnhancers);
const initialState = {};
const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(epicMiddleware)));

epicMiddleware.run(rootEpic);

export default store;
