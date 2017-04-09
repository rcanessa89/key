import React from 'react';
import classnames from 'classnames';
import capitalizeFirst from '../../util/capitalize-first';

const propTypes = {
	text: React.PropTypes.string.isRequired,
	type: React.PropTypes.oneOf(['white', 'light', 'dark', 'black', 'link']),
	size: React.PropTypes.oneOf(['small', 'medium', 'large']),
	inverted: React.PropTypes.bool,
	outlined: React.PropTypes.bool,
	state: React.PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
	hovered: React.PropTypes.bool,
	focused: React.PropTypes.bool,
	active: React.PropTypes.bool,
	loading: React.PropTypes.bool,
	disabled: React.PropTypes.bool,
	iconSize: React.PropTypes.oneOf(['small', 'medium', 'large']),
	iconClass: React.PropTypes.string,
	action: React.PropTypes.func.isRequired,
};

const AppButton = (props) => {
	const buttonClassName = classnames({
		[`is-${props.type}`]: props.type,
		[`is-${props.size}`]: props.size,
		'is-inverted': props.inverted,
		'is-outlined': props.outlined,
		[`is-${props.state}`]: props.state,
		'is-focused': props.focused,
		'is-active': props.active,
		'is-loading': props.loading,
		'is-disabled': props.disabled,
		[`is-${props.iconSize}`]: props.iconSize,
		[`${props.iconClass}`]: props.iconClass,
		button: true,
	});

	const iconSizeClassName = props.iconSize ? `icon is-${props.iconSize}` : 'icon';
	const iconClassName = props.iconClass ? `fa fa-${props.iconClass}` : null;
	let buttonEl = <button className={buttonClassName} type="button" onClick={props.action}>{capitalizeFirst(props.text)}</button>;

	if (props.iconClass) {
		buttonEl = (
			<button className={buttonClassName} type="button" onClick={props.action}>
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
