import React from 'react';

const propTypes = {
	icon: React.PropTypes.string.isRequired,
	size: React.PropTypes.string,
};

const AppIcon = (props) => {
	const sizeClassName = props.size ? `icon is-${props.size}` : 'icon';
	const iconClassName = `fa fa-${props.icon}`;

	return (
		<span className={sizeClassName}>
			<i className={iconClassName} />
		</span>
	);
};

AppIcon.propTypes = propTypes;

export default AppIcon;
