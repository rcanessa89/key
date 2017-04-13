import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import * as actionCreators from './action-creators';
import capitalizeFirst from '../../util/capitalize-first';

const propTypes = {
	name: PropTypes.string.isRequired,
	formId: PropTypes.string.isRequired,
	fieldId: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })),
	required: PropTypes.bool,
	state: PropTypes.object.isRequired,
	size: PropTypes.oneOf(['small', 'medium', 'large']),
	label: PropTypes.string.isRequired,
	registry: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	columns: PropTypes.string,
	columnsTable: PropTypes.string,
	columnsMobile: PropTypes.string,
};

const defaultProps = {
	options: [],
	required: false,
	size: null,
	succesMessage: PropTypes.string,
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
	formState: {
		id: state.forms[ownProps.formId].id,
		sumitted: state.forms[ownProps.formId].sumitted,
		valid: state.forms[ownProps.formId].valid,
	},
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
			name: this.props.name,
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
