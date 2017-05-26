import React from 'react';
import PropTypes from 'prop-types';
import getRol from '../../services/getRole';
import capitalize from '../../util/capitalize-first';

const propTypes = {
    departments: PropTypes.array.isRequired,
};

const DepartmentsTable = props => {
    const rows = props.departments.map(department => (
        <tr>
            <td>{capitalize(department.name)}</td>
        </tr>
    ));

    return (
        <table className="table is-striped">
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
};

DepartmentsTable.propTypes = propTypes;

export default DepartmentsTable;