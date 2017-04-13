import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import capitalizeFirst from '../../util/capitalize-first';

const propTypes = {
	text: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['white', 'light', 'dark', 'black', 'link']),
	size: PropTypes.oneOf(['small', 'medium', 'large']),
	inverted: PropTypes.bool,
	outlined: PropTypes.bool,
	state: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
	hovered: PropTypes.bool,
	focused: PropTypes.bool,
	active: PropTypes.bool,
	loading: PropTypes.bool,
	disabled: PropTypes.bool,
	iconSize: PropTypes.oneOf(['small', 'medium', 'large']),
	iconClass: PropTypes.string,
	action: PropTypes.func.isRequired,
};

const defaultProps = {
	disabled: false,
};

const AppButton = (props) => {
	const buttonClassName = classnames({
		[`is-${props.type}`]: props.type,
		[`is-${props.size}`]: props.size,
		'is-inverted': props.inverted,
		'is-outlined': props.outlined,
		[`is-${props.state}`]: props.state,
		'is-focused': props.focused,
		'is-hovered': props.hovered,
		'is-active': props.active,
		'is-loading': props.loading,
		button: true,
	});

	const iconSizeClassName = props.iconSize ? `icon is-${props.iconSize}` : 'icon';
	const iconClassName = props.iconClass ? `fa fa-${props.iconClass}` : null;
	let buttonEl = <button className={buttonClassName} type="button" onClick={props.action} disabled={props.disabled}>{capitalizeFirst(props.text)}</button>;

	if (props.iconClass) {
		buttonEl = (
			<button className={buttonClassName} type="button" onClick={props.action} disabled={props.disabled}>
				<span className={iconSizeClassName}>
					<i className={iconClassName} />
				</span>
				<span>{capitalizeFirst(props.text)}</span>
			</button>
		);
	}

	return buttonEl;
};

AppButton.propTypes = propTypes;

export default AppButton;
