import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './action-creators';
import guid from '../../util/guid';
import Icon from '../icon/Icon.component';

const propTypes = {
	label: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.element,
	]).isRequired,
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.element),
	]).isRequired,
	id: PropTypes.string.isRequired,
	show: PropTypes.bool.isRequired,
};

const stateMap = (state, ownProps) => ({
	show: state.collapse[ownProps.id] || false,
});

const dispatchMap = dispatch => ({
	dispatch: bindActionCreators(actionCreators, dispatch),
});

class Collapse extends React.PureComponent {
	constructor() {
		super();

		this.toggle = this.toggle.bind(this);
	}

	componentWillMount() {
		this.props.dispatch.init(this.props.id);
	}

	componentWillUnmount() {
		this.props.dispatch.destroy(this.props.id);
	}

	toggle() {
		if (this.props.show) {
			this.props.dispatch.change({
				id: this.props.id,
				value: false,
			});
		} else {
			this.props.dispatch.change({
				id: this.props.id,
				value: true,
			});
		}
	}

	render() {
		const collapseClassName = classnames({
			collapse: true,
			'is-active': this.props.show,
		});

		const icon = this.props.show ? (
			<Icon
				icon="angle-up"
				size="medium"
				click={this.toggle}
			/>
		) : (
			<Icon
				icon="angle-down"
				size="medium"
				click={this.toggle}
			/>
		);

		return (
			<div className={collapseClassName}>
				<div className="label-container">
					<div className="label-content">
						{this.props.label}
					</div>
					<div className="label-button-container">
						{icon}
					</div>
				</div>
				<div className="collapse-content">
					{this.props.children}
				</div>
			</div>
		);
	}
}

Collapse.propTypes = propTypes;

const CollapseContainer = connect(stateMap, dispatchMap)(Collapse);

CollapseContainer.defaultProps = {
	get id() {
		return guid();
	},
};

export default CollapseContainer;
