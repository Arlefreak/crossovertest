import React from 'react';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { fetchDonors } from './actions';
import donorsApp from './reducers';
import App from './components/app.jsx';

const loggerMiddleware = createLogger();

const store = createStore(
    donorsApp,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    )
);
store.dispatch(fetchDonors());


render(
   <Provider store={store}>
   <App />
   </Provider>,
   document.getElementById('root')
);
