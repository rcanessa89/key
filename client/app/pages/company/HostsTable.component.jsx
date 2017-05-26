import React from 'react';
import PropTypes from 'prop-types';
import getRol from '../../services/getRole';
import capitalize from '../../util/capitalize-first';

const propTypes = {
    hosts: PropTypes.array.isRequired,
};

const HostsTable = props => {
    const rows = props.hosts.map(host => (
        <tr>
            <td>{capitalize(host.name)} {capitalize(host.last_name)}</td>
            <td>{capitalize(host.email)}</td>
            <td><a className="button is-black">Black</a></td>
        </tr>
    ));

    return (
        <table className="table is-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
};

HostsTable.propTypes = propTypes;

export default HostsTable;