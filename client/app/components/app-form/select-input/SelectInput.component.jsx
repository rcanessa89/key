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
		required: false,
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

	render() {
		const requiredMessage = this.props.state.required && this.props.state.value.length ? (<p className="help is-danger">This email is invalid</p>) : null;

		const selectClassName = classnames({
			select: true,
			[`is-${this.props.size}`]: this.props.size,
		});

		return (
			<div className="field">
				<label className="label">Subject</label>
				<p className="control">
					<span className={selectClassName}>
						<select onChange={this.onChange}>
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
