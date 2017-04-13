import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	icon: PropTypes.string.isRequired,
	size: PropTypes.string,
};

const defaultProps = {
	size: null,
};

const Icon = (props) => {
	const sizeClassName = props.size ? `icon is-${props.size}` : 'icon';
	const iconClassName = `fa fa-${props.icon}`;

	return (
		<span className={sizeClassName}>
			<i className={iconClassName} />
		</span>
	);
};

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
