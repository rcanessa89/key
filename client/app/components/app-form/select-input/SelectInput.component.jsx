import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import * as actionCreators from './action-creators';

const propTypes = {
	name: React.PropTypes.string.isRequired,
	selectInputId: React.PropTypes.string.isRequired,
	options: React.PropTypes.arrayOf(React.PropTypes.shape({ label: React.PropTypes.string, value: React.PropTypes.string })),
	required: React.PropTypes.bool,
	state: React.PropTypes.object.isRequired,
	size: React.PropTypes.oneOf(['small', 'medium', 'large']),
	onChange: React.PropTypes.func.isRequired,
};

const defaultProps = {
	options: [],
	required: false,
	size: null,
	succesMessage: React.PropTypes.string,
	state: {
		id: null,
		name: null,
		value: null,
		valid: true,
	},
};

const stateMap = (state, ownProps) => ({
	state: state.selectInput[ownProps.selectInputId],
});

const dispatchMap = dispatch => bindActionCreators(actionCreators, dispatch);

class SelectInput extends React.PureComponent {
	constructor() {
		super();
		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	componentWillMount() {
		this.props.init({
			id: this.props.selectInputId,
			value: null,
			valid: true,
			required: false,
		});
	}

	componentWillUnmount() {
		this.props.destroy(this.props.textInputId);
	}

	onChange(e) {
		const state = {
			id: this.props.selectInputId,
			name: this.props.name,
			value: e.target.value,
			required: this.props.required,
		};

		this.props.onChange(state);
	}

	onBlur(e) {
		let state = {
			id: this.props.selectInputId,
			name: this.props.name,
		};

		if (!this.props.state.value && this.props.required) {
			state.value = null;
			state.valid = null;
			state.required = true;
		} else {
			state.value = this.props.state.value;
			state.valid = true;
			state.required = false;
		}

		this.props.onChange(state);
	}

	render() {
		const requiredMessage = this.props.state.required && !this.props.state.value ? (<p className="help is-danger">{`The ${this.props.name} field is required.`}</p>) : null;

		const selectClassName = classnames({
			select: true,
			[`is-${this.props.size}`]: this.props.size,
		});

		return (
			<div className="field">
				<label className="label">Subject</label>
				<p className="control">
					<span className={selectClassName}>
						<select onChange={this.onChange} onBlur={this.onBlur}>
							<option value="">Select...</option>
							{
								this.props.options.map((option, index) => <option key={index} value={option.value}>{option.label}</option>)
							}
						</select>
					</span>
				</p>
				{requiredMessage}
			</div>
		);
	}
}

SelectInput.propTypes = propTypes;
SelectInput.defaultProps = defaultProps;

export default connect(stateMap, dispatchMap)(SelectInput);
