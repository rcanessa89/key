import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import * as actionCreators from './action-creators';
import capitalizeFirst from '../../util/capitalize-first';

const propTypes = {
	name: React.PropTypes.string.isRequired,
	formId: React.PropTypes.string.isRequired,
	fieldId: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	options: React.PropTypes.arrayOf(React.PropTypes.shape({ label: React.PropTypes.string.isRequired, value: React.PropTypes.string.isRequired })),
	required: React.PropTypes.bool,
	state: React.PropTypes.object.isRequired,
	onChange: React.PropTypes.func.isRequired,
	registry: React.PropTypes.func.isRequired,
	columns: React.PropTypes.string,
	columnsTable: React.PropTypes.string,
	columnsMobile: React.PropTypes.string,
};

const defaultProps = {
	options: [],
	required: false,
	state: {
		id: null,
		name: null,
		value: [],
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

class CheckInput extends React.PureComponent {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	componentWillMount() {
		this.props.registry({
			formId: this.props.formId,
			fieldId: this.props.fieldId,
			value: [],
			valid: true,
			required: false,
		});
	}

	onChange(e) {
		let value = [];
		const index = this.props.state.value.indexOf(e.target.value);

		if (index < 0) {
			value = [...this.props.state.value, e.target.value];
		} else {
			value = [
				...this.props.state.value.slice(0, index),
				...this.props.state.value.slice(index + 1),
			];
		}

		const state = {
			formId: this.props.formId,
			fieldId: this.props.fieldId,
			name: this.props.name,
			value,
			required: !value.length,
		};

		this.props.onChange(state);
	}

	render() {
		const requiredError = this.props.state.required ? (<p className="help is-danger">{`At least 1 option is required for ${this.props.name} field`}</p>) : null;

		const fieldClassName = classnames({
			'app-check-input': true,
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
								return (
									<label className="checkbox" htmlFor={this.props.name} key={key}>
										<span >
											<input type="checkbox" id={this.props.name} name={this.props.name} value={option.value} onChange={this.onChange} />
											{capitalizeFirst(option.label)}
										</span>
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

CheckInput.propTypes = propTypes;
CheckInput.defaultProps = defaultProps;

export default connect(stateMap, dispatchMap)(CheckInput);
