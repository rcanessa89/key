import React from 'react';
import PropTypes from 'prop-types';
import capitalizeFirst from '../../util/capitalize-first';

const propTypes = {
	type: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
	text: PropTypes.string.isRequired,
};

const defaultProps = {
	type: null,
};

const AppNotification = (props) => {
	const typeClassName = props.type !== undefined ? `notification is-${props.type}` : 'notification';

	return (
		<div className={typeClassName}>
			<button className="delete" />
			{capitalizeFirst(props.text)}
		</div>
	);
};

AppNotification.propTypes = propTypes;
AppNotification.defaultProps = defaultProps;

export default AppNotification;
