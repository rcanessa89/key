import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import * as actionCreators from './action-creators';
import guid from '../../../util/guid';
import TextValidator from '../../../util/TextValidator';

const propTypes = {
	type: React.PropTypes.oneOf(['text', 'email']),
	name: React.PropTypes.string.isRequired,
	pattern: React.PropTypes.string,
	textInputId: React.PropTypes.string,
	size: React.PropTypes.oneOf(['small', 'medium', 'large']),
	label: React.PropTypes.string.isRequired,
	placeholer: React.PropTypes.string,
	errorMessage: React.PropTypes.string,
	succesMessage: React.PropTypes.string,
	init: React.PropTypes.func.isRequired,
	destroy: React.PropTypes.func.isRequired,
	state: React.PropTypes.shape({
		id: React.PropTypes.string.isRequired,
		name: React.PropTypes.string.isRequired,
		valid: React.PropTypes.bool.isRequired,
		value: React.PropTypes.string.isRequired,
	})
};

const defaultProps = {
	type: 'text',
	textInputId: null,
	size: null,
	placeholer: null,
	errorMessage: 'Error.',
	succesMessage: null,
	state: null,
	pattern: null,
};

const stateMap = (state, ownProps) => {
	console.log(state);

	return {
	state: state.form.textInput[ownProps.textInputId],
}
};

const dispatchMap = dispatch => bindActionCreators(actionCreators, dispatch);

class TextInput extends React.PureComponent {
	constructor() {
		super();
		this.onChange = this.onChange.bind(this);
		this.validator = null;
	}

	componentWillMount() {
		if (this.props.pattern) {
			this.validator = new TextValidator({ pattern: this.props.pattern });
		} else if (this.props.type === 'text') {
			this.validator = new TextValidator({ type: 'letters' });
		} else {
			this.validator = new TextValidator({ type: 'email' });
		}

		this.props.init({ id: this.props.textInputId, name: this.props.name, valid: true, value: null });
	}

	componentWillUnmount() {
		this.props.destroy(this.props.textInputId);
	}

	onChange(e) {
		const state = {
			id: this.props.textInputId,
			name: this.props.name,
			value: e.target.value,
			isValid: this.validator.text(value) && e.target.value.length,
		};

		this.props.onChange(state);
	} 

	render() {
		console.log(this.props);

		const validIcon = this.props.state.valid ? (<span class="icon is-small"><i class="fa fa-check"></i></span>) : null;
		const validMessage = this.props.state.valid && this.props.succesMessage ? (<p class="help is-success">{this.props.validMessage}</p>) : null;
		const errorIcon = !this.props.state.valid ? (<span class="icon is-small"><i class="fa fa-warning"></i></span>) : null;
		const errorMessage = !this.props.state.valid ? (<p class="help is-danger">{this.props.errorMessage}</p>) : null;
		const inputClassName = this.props.size ? `input is-${this.props.size}` : 'input';

		return (
			<div className="field">
				<label className="label">{this.props.label}</label>
				<p className="control">
					<input id={this.props.textInputId} className={inputClassName} type={this.props.type} placeholder={this.props.placeholer} onChange={this.onChange} />
					{validIcon}
					{errorIcon}
				</p>
				{errorIcon}
				{validMessage}
			</div>
		);
	}
}

export default connect(stateMap, dispatchMap)(TextInput);