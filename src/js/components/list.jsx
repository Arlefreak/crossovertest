import React, { PropTypes } from 'react';
import Row from './row.jsx';

const List = ({ donors, onRowClick }) => (
    <aside className="list">
        <h2>Donors</h2>
        <ul>
            { 
                donors.map(row =>
                        <Row
                            key={row.id}
                            {...row}
                            onClick={() => onRowClick(row.id)}
                        />
                        )}
                    </ul>
                </aside>
);

List.propTypes = {
    donors: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        bloodType: PropTypes.string.isRequired,
        ip: PropTypes.string.isRequired,
        location: PropTypes.arrayOf(React.PropTypes.number)
    }).isRequired).isRequired,
    onRowClick: PropTypes.func.isRequired
};

export default List;
