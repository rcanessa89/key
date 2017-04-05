import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './action-creators';
import guid from '../../util/guid';
import capitalizeFirst from '../../util/capitalize-first';

const propTypes = {
	title: React.PropTypes.string.isRequired,
	subtitle: React.PropTypes.string,
	children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
	formId: React.PropTypes.string,
	init: React.PropTypes.func.isRequired,
	destroy: React.PropTypes.func.isRequired,
};

const defaultProps = {
	formId: null,
	subtitle: null,
};

const stateMap = state => {
	return (
		form: 
	)
}

const dispatchMap = dispatch => ({
	init: state => dispatch(actionCreators.init(state)),
	destroy: id => dispatch(actionCreators.destroy(id)),
});

class AppForm extends React.PureComponent {
	constructor(props) {
		super(props);

		console.log(this)

		this.id = this.props.formId || guid();
		this.fields = React.Children.map(this.props.children, child => React.cloneElement(child, { ...child.props, formId: this.id, fieldId: guid() }));
	}

	componentWillMount() {
		const state = {
			id: this.id,
			valid: false,
			submited: false,
			fields: {},
		};

		this.props.init(state);
	}

	componentWillUnmount() {
		this.props.destroy(this.id);
	}



	render() {
		const subtitle = this.props.subtitle ? (<h3 className="title is-3">{capitalizeFirst(this.props.subtitle)}</h3>) : null;

		return (
			<form id={this.id}>
				<h2 className="title is-2">{capitalizeFirst(this.props.title)}</h2>
				{subtitle}
				<div className="columns is-multiline">{this.fields}</div>
			</form>
		);
	}
}

AppForm.propTypes = propTypes;
AppForm.defaultProps = defaultProps;

export default connect(null, dispatchMap)(AppForm);
