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
	resetStyle: PropTypes.bool,
};

const defaultProps = {
	disabled: false,
	action: () => false,
	resetStyle: false,
};

const AppButton = (props) => {
	const isReseted = value => !props.resetStyle && value ? true : false;

	const buttonClassName = classnames({
		[`is-${props.type}`]: isReseted(props.type),
		[`is-${props.size}`]: isReseted(props.size),
		'is-inverted': isReseted(props.inverted),
		'is-outlined': isReseted(props.outlined),
		[`is-${props.state}`]: isReseted(props.state),
		'is-focused': isReseted(props.focused),
		'is-hovered': isReseted(props.hovered),
		'is-active': isReseted(props.active),
		'is-loading': isReseted(props.loading),
		button: !props.resetStyle,
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
AppButton.defaultProps = defaultProps;

export default AppButton;
