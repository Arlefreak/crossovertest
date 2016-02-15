/*
 * action types
 */

export const ADD = 'ADD_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/*
 * other constants
 */

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_BY_TYPE: 'SHOW_BY_TYPE'
};

/*
 * action creators
 */

let nextItem = 0;
export function addTodo(firstName, lastName, email, phone, bloodType, ip, location) {
    console.log(nextItem);
    return { 
        id : nextItem++,
        type: ADD,
        firstName,
        lastName,
        email,
        phone,
        bloodType,
        ip,
        location
    };
}

export function setVisibilityFilter(filter) {
    return { type: SET_VISIBILITY_FILTER, filter };
}

export const REQUEST_DONORS = 'REQUEST_DONORS';

export function requestDonors() {
    return {
        type: REQUEST_DONORS
    };
}

export const RECIVE_DONORS = 'RECIVE_DONORS';

export function reciveDonors(json) {
    json = Object.keys(json).map(key => json[key]);
    return {
        type: RECIVE_DONORS,
        donors: json,
        receivedAt: Date.now()
    };
}

export function fetchDonors() {

    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.

    return function (dispatch) {

        // First dispatch: the app state is updated to inform
        // that the API call is starting.

        dispatch(requestDonors());

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        return fetch('http://127.0.0.1:3000/api/donors')
        .then(response => response.json())
        .then(json =>

              // We can dispatch many times!
              // Here, we update the app state with the results of the API call.

              dispatch(reciveDonors(json))
             );

             // In a real world app, you also want to
             // catch any error in the network call.
    };
}

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

import { combineReducers } from 'redux';
import { ADD, RECIVE_DONORS, REQUEST_DONORS,SET_VISIBILITY_FILTER, VisibilityFilters } from './actions';
const { SHOW_ALL } = VisibilityFilters;

function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}

function updateDonors(state = [], action) {
    switch (action.type) {
        case ADD:
            return Object.assign([], state, {
                id: action.id,
                firstName: action.firstName,
                lastName: action.lastName,
                email: action.email,
                phone: action.phone,
                bloodType: action.bloodType,
                ip: action.ip,
                location: action.location
            });
        default:
            return state;
    }
}

function apiRequest(state = {
    isFetching: false,
    didInvalidate: false,
    type: ''
}, action){
    switch (action.type) {
        case REQUEST_DONORS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case RECIVE_DONORS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                lastUpdated: action.receivedAt
            });
        default:
            return state;
    }
}

const donorsApp = combineReducers({
    visibilityFilter,
    updateDonors,
    apiRequest
});

export default donorsApp;

import { connect } from 'react-redux';
import List from '../components/list.jsx';
import { setVisibilityFilter } from '../actions';

const getVisible = (donors, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return donors;
        default:
            return donors;
    }
};

const mapStateToProps = (state) => {
    return {
        donors: getVisible(state.donors.items, state.visibilityFilter)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRowClick: (id) => {
            dispatch(setVisibilityFilter('SHOW_ALL'));
            console.log('Clicked: ' + id);
        }
    };
};

const VisibleList = connect(
    mapStateToProps,
    mapDispatchToProps
)(List);

export default VisibleList;
