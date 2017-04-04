import React from 'react';
import capitalizeFirst from '../../util/capitalize-first';

const propTypes = {
	text: React.PropTypes.string.isRequired,
	size: React.PropTypes.string,
	subtitle: React.PropTypes.string,
	subtitleSize: React.PropTypes.string,
};

const defaultProps = {
	size: null,
	subtitleSize: null,
	subtitle: null,
};

const Title = (props) => {
	const titleClassName = props.size ? `title is-${props.size}` : 'title';
	const titleEl = <div className={titleClassName}>{capitalizeFirst(props.text)}</div>;
	const subtitleClassName = props.subtitleSize ? `subtitle is-${props.subtitleSize}` : 'subtitle';
	const subtitleEl = props.subtitle ? <h2 className={subtitleClassName}>{capitalizeFirst(props.subtitle)}</h2> : null;

	return (
		<div>
			{titleEl}
			{subtitleEl}
		</div>
	);
};

Title.propTypes = propTypes;
Title.defaultProps = defaultProps;

export default Title;
