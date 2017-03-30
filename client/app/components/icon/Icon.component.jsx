import React from 'react';

const propTypes = {
	icon: React.PropTypes.string.isRequired,
	size: React.PropTypes.string,
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
