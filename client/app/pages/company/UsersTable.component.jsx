import React from 'react';
import PropTypes from 'prop-types';
import getRol from '../../services/getRole';
import capitalize from '../../util/capitalize-first';

const propTypes = {
    users: PropTypes.array.isRequired,
};

const UsersTable = props => {
    const rows = props.users.map(user => (
        <tr>
            <td>{capitalize(user.name)} {capitalize(user.last_name)}</td>
            <td>{user.email}</td>
            <td>{capitalize(getRol(user.role))}</td>
        </tr>
    ));

    return (
        <table className="table is-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
};

UsersTable.propTypes = propTypes;

export default UsersTable;
