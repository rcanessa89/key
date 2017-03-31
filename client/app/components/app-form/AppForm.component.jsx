import React from 'react';
import guid from '../../util/guid';

const propTypes = {
	children: React.PropTypes.element.isRequired,
	onSubmit: React.PropTypes.func.isRequired,
};

const AppForm = (props) => {
	const formId = guid();

	return (
		<form id={formId}>
			{React.cloneElement(props.children, { ...props.children.props, onSubmit: props.onSubmit })}
		</form>
	);
};

AppForm.propTypes = propTypes;

export default AppForm;
