import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actionCreators from './action-creators';
import guid from '../../util/guid';
import capitalizeFirst from '../../util/capitalize-first';
import AppButton from '../app-button/AppButton.component';
import store from '../../store.app';

const propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]).isRequired,
	formId: PropTypes.string,
	init: PropTypes.func.isRequired,
	destroy: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onCancel: PropTypes.func,
	withButtons: PropTypes.bool,
	selfDEstroy: PropTypes.bool,
	evalForm: PropTypes.func.isRequired,
};

const defaultProps = {
	formId: null,
	title: null,
	subtitle: null,
	withButtons: true,
	endpoint: null,
	selfDEstroy: true,
};

const stateMap = (state, ownProps) => ({
	form: state.forms[ownProps.formId]
});

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

	componentWillMount() {
		this.setForm();
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.form) {
			this.setForm();
		}
	}

	componentWillUnmount() {
		if (this.props.selfDEstroy) {
			this.props.destroy(this.id);
		}
	}

	setForm() {
		this.id = this.props.formId || guid();
		this.submit = this.submit.bind(this);
		this.fields = React.Children.map(this.props.children, child => React.cloneElement(child, { ...child.props, formId: this.id, fieldId: child.props.fieldId || guid() }));
		
		const state = {
			id: this.id,
			valid: false,
			submitted: false,
			fields: {},
		};

		this.props.init(state);
	}

	submit() {
		const form = this.props.form;

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
			this.props.destroy(this.id);
		}
	}

	render() {
		if (!this.props.form) {
			return null;
		}

		const title = this.props.title ? (<h2 className="title is-2">{capitalizeFirst(this.props.title)}</h2>) : null;
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

		const form = (
			<form
				id={this.id}
				className="app-form"
			>
				{title}
				{subtitle}
				<div className="columns is-multiline">{this.fields}</div>
				{buttonsContainer}
			</form>
		);

		return form;
	}
}

AppForm.propTypes = propTypes;
AppForm.defaultProps = defaultProps;

export default connect(stateMap, dispatchMap)(AppForm);
