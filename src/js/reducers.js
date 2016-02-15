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
