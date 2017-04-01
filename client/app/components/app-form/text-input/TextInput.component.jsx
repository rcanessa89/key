import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import * as actionCreators from './action-creators';
import TextValidator from '../../../util/TextValidator';

const propTypes = {
	type: React.PropTypes.oneOf(['text', 'letters', 'email']),
	name: React.PropTypes.string.isRequired,
	pattern: React.PropTypes.string,
	textInputId: React.PropTypes.string.isRequired,
	size: React.PropTypes.oneOf(['small', 'medium', 'large']),
	label: React.PropTypes.string.isRequired,
	placeholer: React.PropTypes.string,
	errorMessage: React.PropTypes.string,
	succesMessage: React.PropTypes.string,
	init: React.PropTypes.func.isRequired,
	destroy: React.PropTypes.func.isRequired,
	required: React.PropTypes.bool,
	onChange: React.PropTypes.func.isRequired,
	state: React.PropTypes.shape({
		id: React.PropTypes.string,
		name: React.PropTypes.string,
		valid: React.PropTypes.bool,
		value: React.PropTypes.string,
		required: React.PropTypes.bool,
	}),
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
};

const stateMap = (state, ownProps) => ({
	state: state.textInput[ownProps.textInputId],
});

const dispatchMap = dispatch => bindActionCreators(actionCreators, dispatch);

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

		this.props.init({
			id: this.props.textInputId,
			name: this.props.name,
			valid: true,
			value: '',
			required: false,
		});
	}

	componentWillUnmount() {
		this.props.destroy(this.props.textInputId);
	}

	onChange(e) {
		const state = {
			id: this.props.textInputId,
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

		return (
			<div className="field">
				<label className="label" htmlFor={this.props.textInputId}>{this.props.label}</label>
				<p className="control has-icon has-icon-right">
					<input id={this.props.textInputId} className={inputClassName} type={this.props.type} placeholder={this.props.placeholer} onChange={this.onChange} />
					{validIcon}
					{errorIcon}
				</p>
				{errorMessage}
				{validMessage}
			</div>
		);
	}
}

TextInput.propTypes = propTypes;
TextInput.defaultProps = defaultProps;

export default connect(stateMap, dispatchMap)(TextInput);
