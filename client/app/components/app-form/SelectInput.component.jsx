import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import * as actionCreators from './action-creators';
import capitalizeFirst from '../../util/capitalize-first';

const propTypes = {
	name: React.PropTypes.string.isRequired,
	formId: React.PropTypes.string.isRequired,
	fieldId: React.PropTypes.string.isRequired,
	options: React.PropTypes.arrayOf(React.PropTypes.shape({ label: React.PropTypes.string, value: React.PropTypes.string })),
	required: React.PropTypes.bool,
	state: React.PropTypes.object.isRequired,
	size: React.PropTypes.oneOf(['small', 'medium', 'large']),
	label: React.PropTypes.string.isRequired,
	registry: React.PropTypes.func.isRequired,
	onChange: React.PropTypes.func.isRequired,
	columns: React.PropTypes.string,
	columnsTable: React.PropTypes.string,
	columnsMobile: React.PropTypes.string,
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

class SelectInput extends React.PureComponent {
	constructor() {
		super();
		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	componentWillMount() {
		this.props.registry({
			formId: this.props.formId,
			fieldId: this.props.fieldId,
			value: null,
			valid: true,
			required: false,
		});
	}

	onChange(e) {
		const state = {
			formId: this.props.formId,
			fieldId: this.props.fieldId,
			name: this.props.name,
			value: e.target.value,
			required: this.props.required,
		};

		this.props.onChange(state);
	}

	onBlur() {
		const state = {
			formId: this.props.formId,
			fieldId: this.props.fieldId,
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
		const requiredMessage = this.props.state.required && !this.props.state.value ? (<p className="help is-danger">{`The ${this.props.label} field is required.`}</p>) : null;

		const selectClassName = classnames({
			select: true,
			[`is-${this.props.size}`]: this.props.size,
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
					<p className="label">{capitalizeFirst(this.props.label)}</p>
					<p className="control">
						<span className={selectClassName}>
							<select onChange={this.onChange} onBlur={this.onBlur}>
								<option value="">Select...</option>
								{
									this.props.options.map((option, index) => {
										const key = `key-${index}`;
										return <option key={key} value={option.value}>{capitalizeFirst(option.label)}</option>;
									})
								}
							</select>
						</span>
					</p>
					{requiredMessage}
				</div>
			</div>
		);
	}
}

SelectInput.propTypes = propTypes;
SelectInput.defaultProps = defaultProps;

export default connect(stateMap, dispatchMap)(SelectInput);
