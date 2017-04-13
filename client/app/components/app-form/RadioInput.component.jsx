import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import * as actionCreators from './action-creators';
import capitalizeFirst from '../../util/capitalize-first';
import guid from '../../util/guid';

const propTypes = {
	name: PropTypes.string.isRequired,
	formId: PropTypes.string.isRequired,
	fieldId: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string.isRequired, value: PropTypes.string.isRequired })),
	required: PropTypes.bool,
	state: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	registry: PropTypes.func.isRequired,
	columns: PropTypes.string,
	columnsTable: PropTypes.string,
	columnsMobile: PropTypes.string,
};

const defaultProps = {
	options: [],
	required: false,
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

class RadioInput extends React.PureComponent {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
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
			valid: e.target.value !== undefined && e.target.value !== null,
			required: false,
		};

		this.props.onChange(state);
	}

	render() {
		const requiredError = this.props.state.required ? (<p className="help is-danger">{`The field ${this.props.name} is required`}</p>) : null;

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
						{
							this.props.options.map((option, index) => {
								const key = `key-${index}`;
								const id = guid();
								return (
									<label className="radio" htmlFor={id} key={key}>
										<input id={id} type="radio" name={this.props.name} value={option.value} onChange={this.onChange} />
										{capitalizeFirst(option.label)}
									</label>
								);
							})
						}
					</p>
					{requiredError}
				</div>
			</div>
		);
	}
}

RadioInput.propTypes = propTypes;
RadioInput.defaultProps = defaultProps;

export default connect(stateMap, dispatchMap)(RadioInput);
