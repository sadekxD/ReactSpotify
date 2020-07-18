import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import audioReducer from './store/reducer/play';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    audio: audioReducer,
})

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)))

const app = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(app, document.querySelector('#root'));

serviceWorker.unregister();
