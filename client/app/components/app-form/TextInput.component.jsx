import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import * as actionCreators from './action-creators';
import TextValidator from '../../util/TextValidator';

const propTypes = {
	formId: React.PropTypes.string.isRequired,
	fieldId: React.PropTypes.string.isRequired,
	name: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	placeholer: React.PropTypes.string.isRequired,
	type: React.PropTypes.oneOf(['text', 'letters', 'email']),
	size: React.PropTypes.oneOf(['small', 'medium', 'large']),
	placeholer: React.PropTypes.string,
	errorMessage: React.PropTypes.string,
	succesMessage: React.PropTypes.string,
	required: React.PropTypes.bool,
	pattern: React.PropTypes.string,
	state: React.PropTypes.shape({
		id: React.PropTypes.string,
		name: React.PropTypes.string,
		valid: React.PropTypes.bool,
		value: React.PropTypes.string,
		required: React.PropTypes.bool,
	}),
	columns: React.PropTypes.string,
	columnsTable: React.PropTypes.string,
	columnsMobile: React.PropTypes.string,
};

const defaultProps = {
	type: 'text',
	size: null,
	placeholer: null,
	errorMessage: null,
	succesMessage: null,
	required: false,
	pattern: null,
	state: {
		id: null,
		name: null,
		value: '',
		valid: true,
		required: false,
	},
	columns: '12',
	columnsTable: '12',
	columnsMobile: '12',
};

const stateMap = (state, ownProps) => ({
	state: state.forms[ownProps.formId].fields[ownProps.fieldId],
});

const dispatchMap = dispatch => ({
	registry: field => dispatch(actionCreators.registryField(field)),
	onChange: field => dispatch(actionCreators.onChangeField(field)),
});

class TextInput extends React.PureComponent {
	constructor() {
		super();
		this.onChange = this.onChange.bind(this);
		this.validator = null;
		this.errorMessage = null;
	}

	componentWillMount() {
		if (this.props.pattern) {
			this.validator = new TextValidator({ pattern: this.props.pattern });
			if (this.props.errorMessage) {
				this.errorMessage = this.props.errorMessage;
			} else {
				this.errorMessage = 'Invalid value.';
			}
		} else if (this.props.type === 'letters') {
			this.validator = new TextValidator({ type: 'letters' });
			this.errorMessage = 'Only letters allowed.';
		} else if (this.props.type === 'email') {
			this.validator = new TextValidator({ type: 'email' });
			this.errorMessage = 'Invalid email.';
		}

		this.props.registry({
			formId: this.props.formId,
			fieldId: this.props.fieldId,
			name: this.props.name,
			valid: true,
			value: '',
			required: false,
		});
	}

	onChange(e) {
		const state = {
			formId: this.props.formId,
			fieldId: this.props.fieldId,
			name: this.props.name,
			value: e.target.value,
			valid: this.props.type === 'text' ? true : this.validator.test(e.target.value),
			required: e.target.value.length === 0 && this.props.required,
		};

		this.props.onChange(state);
	}

	render() {
		const validIcon = this.props.state.valid && this.props.state.value.length ? (<span className="icon is-small"><i className="fa fa-check" /></span>) : null;
		const validMessage = this.props.state.valid && this.props.succesMessage && this.props.state.value.length ? (<p className="help is-success">{this.props.succesMessage}</p>) : null;
		const errorIcon = !this.props.state.valid || this.props.state.required ? (<span className={`icon is-${this.props.size}`}><i className="fa fa-warning" /></span>) : null;

		let errorMessage = null;

		if (!this.props.state.valid && !this.props.state.required) {
			errorMessage = <p className="help is-danger">{this.errorMessage}</p>;
		} else if (this.props.state.valid && this.props.state.required) {
			errorMessage = <p className="help is-danger">{`The ${this.props.name} field is required.`}</p>;
		}

		const inputClassName = classnames({
			input: true,
			[`is-${this.props.size}`]: this.props.size,
			'is-danger': !this.props.state.valid || this.props.state.required,
		});

		const fieldClassName = classnames({
			column: true,
			[`is-${this.props.columns}-desktop`]: true,
			[`is-${this.props.columnsTable}-tablet`]: true,
			[`is-${this.props.columnsMobile}-mobile`]: true,
		});

		return (
			<div className={fieldClassName}>
				<div className="field">
					<label className="label" htmlFor={this.props.fieldId}>{this.props.label}</label>
					<p className="control has-icon has-icon-right">
						<input id={this.props.fieldId} className={inputClassName} type={this.props.type} placeholder={this.props.placeholer} onChange={this.onChange} />
						{validIcon}
						{errorIcon}
					</p>
					{errorMessage}
					{validMessage}
				</div>
			</div>
		);
	}
}

TextInput.propTypes = propTypes;
TextInput.defaultProps = defaultProps;

export default connect(stateMap, dispatchMap)(TextInput);
