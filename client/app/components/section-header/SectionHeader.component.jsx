import React from 'react';
import PropTypes from 'prop-types';
import capitalizeFirst from '../../util/capitalize-first';

const propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
    line: PropTypes.boolean,
};

const SectionHeader = props => {
    const hr = props.line ? <hr /> : null;

    return (
        <div className="heading">
            <h1 className="title">{capitalizeFirst(props.title)}</h1>
            <h2 className="subtitle">{capitalizeFirst(props.subtitle)}</h2>
            {hr}
        </div>
    )

};

SectionHeader.propTypes = propTypes;

export default SectionHeader;