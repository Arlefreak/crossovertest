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
