import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './action-creators';
import guid from '../../util/guid';

const propTypes = {
	formId: React.PropTypes.string,
	init: React.PropTypes.func.isRequired,
	destroy: React.PropTypes.func.isRequired,
};

const dispatchMap = dispatch => ({
	init: state => dispatch(actionCreators.init(state)),
	destroy: id => dispatch(actionCreators.destroy(id)),
});

class AppForm extends React.PureComponent {
	constructor(props) {
		super(props);

		this.id = this.props.formId || guid();
		this.fields = React.Children.map(this.props.children, child => React.cloneElement(child, { ...child.props, formId: this.id, fieldId: guid() }));

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
		return (
			<form id={this.id}>
				<div className="columns is-multiline">{this.fields}</div>
			</form>
		);
	}
}


AppForm.propTypes = propTypes;

export default connect(null, dispatchMap)(AppForm);
