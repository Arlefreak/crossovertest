import React, { PropTypes } from 'react';

const Row = (
    { 
        id,
        onClick,
        firstName,
        lastName,
        email,
        phone,
        bloodType,
        ip,
        location
    }
) => (
<li
    onClick={onClick}
>
    <span>{id}</span>
    <span>
        {
            firstName  + ' - ' +
                lastName
        }
    </span>
    <span>{email}</span>
    <span>{phone}</span>
    <span>{bloodType}</span>
    <span>{ip}</span>
    <span>{location}</span>
</li>
);

Row.propTypes = {
    id: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    bloodType: PropTypes.string.isRequired,
    ip: PropTypes.string.isRequired,
    location: PropTypes.arrayOf(React.PropTypes.number)
};

export default Row;
