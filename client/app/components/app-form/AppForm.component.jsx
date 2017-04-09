import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './action-creators';
import guid from '../../util/guid';
import capitalizeFirst from '../../util/capitalize-first';
import AppButton from '../app-button/AppButton.component';
import store from '../../store.app';

const propTypes = {
	title: React.PropTypes.string.isRequired,
	subtitle: React.PropTypes.string,
	children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
	formId: React.PropTypes.string,
	init: React.PropTypes.func.isRequired,
	destroy: React.PropTypes.func.isRequired,
	onSubmit: React.PropTypes.func.isRequired,
	onCancel: React.PropTypes.func,
	withButtons: React.PropTypes.bool,
	selfDEstroy: React.PropTypes.bool,
	evalForm: React.PropTypes.func.isRequired,
};

const defaultProps = {
	formId: null,
	subtitle: null,
	onCancel: () => false,
	withButtons: true,
	endpoint: null,
	selfDEstroy: true,
};

const dispatchMap = dispatch => ({
	init: state => dispatch(actionCreators.init(state)),
	destroy: id => dispatch(actionCreators.destroy(id)),
	evalForm: state => dispatch(actionCreators.evalForm(state)),
});

class AppForm extends React.PureComponent {
	static getFormValues(form) {
		const values = {};
		const keys = Object.keys(form.fields);

		for (let i = 0; i < keys.length; i += 1) {
			values[form.fields[keys[i]].name] = form.fields[keys[i]].value;
		}

		return values;
	}

	constructor(props) {
		super(props);
		this.id = this.props.formId || guid();
		this.form = null;
		this.submit = this.submit.bind(this);
		this.fields = React.Children.map(this.props.children, child => React.cloneElement(child, { ...child.props, formId: this.id, fieldId: guid() }));
	}

	componentWillMount() {
		const state = {
			id: this.id,
			valid: false,
			submitted: false,
			fields: {},
		};

		this.props.init(state);
	}

	componentWillUnmount() {
		if (this.props.selfDEstroy) {
			this.props.destroy(this.id);
		}
	}

	submit() {
		const form = { ...store.getState().forms[this.id] };

		let isValid = true;

		for (let i = 0; i < this.fields.length; i += 1) {
			if (this.fields[i].props.required && !!form.fields[this.fields[i].props.fieldId].value === false) {
				form.fields[this.fields[i].props.fieldId].required = true;
				form.fields[this.fields[i].props.fieldId].valid = false;
			}

			if (!form.fields[this.fields[i].props.fieldId].valid) {
				isValid = false;
			}
		}

		form.submitted = true;
		form.valid = isValid;

		this.props.evalForm(form);

		if (isValid) {
			this.props.onSubmit(AppForm.getFormValues(form));
		}
	}

	render() {
		const subtitle = this.props.subtitle ? (<h3 className="title is-3">{capitalizeFirst(this.props.subtitle)}</h3>) : null;
		const cancelButton = this.props.onCancel ? (
			<AppButton
				text="cancel"
				action={this.props.onCancel}
			/>
		) : null;

		const buttonsContainer = this.props.withButtons ? (
			<div className="buttons-container">
				<AppButton
					text="submit"
					state="success"
					action={this.submit}
				/>
				{cancelButton}
			</div>
		) : null;

		return (
			<form
				id={this.id}
				className="app-form"
			>
				<h2 className="title is-2">{capitalizeFirst(this.props.title)}</h2>
				{subtitle}
				<div className="columns is-multiline">{this.fields}</div>
				{buttonsContainer}
			</form>
		);
	}
}

AppForm.propTypes = propTypes;
AppForm.defaultProps = defaultProps;

export default connect(null, dispatchMap)(AppForm);
