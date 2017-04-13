import React from 'react';
import PropTypes from 'prop-types';
import capitalizeFirst from '../../util/capitalize-first';

const propTypes = {
	type: PropTypes.oneOf(['dark', 'primary', 'info', 'success', 'warning', 'danger']),
	header: PropTypes.string,
	children: PropTypes.element,
};

const defaultProps = {
	type: null,
	header: null,
	children: null,
};

const Message = (props) => {
	let header = null;

	if (props.header) {
		header = (
			<div className="message-header">
				<p>{capitalizeFirst(props.header)}</p>
				<button className="delete" />
			</div>
		);
	}

	const typeClassName = props.type ? `message is-${props.type}` : 'message';

	return (
		<article className={typeClassName}>
			{header}
			<div className="message-body">
				{props.children}
			</div>
		</article>
	);
};

Message.propTypes = propTypes;
Message.defaultProps = defaultProps;

export default Message;
