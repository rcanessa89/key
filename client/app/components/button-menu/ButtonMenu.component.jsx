import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as actionCreators from './action-creators';
import capitalizeFirst from '../../util/capitalize-first';
import guid from '../../util/guid';

const propTypes = {
	wrapperClass: React.PropTypes.string
};

const stateMap = (state, ownProps) => ({
	menus: state.buttonMenus,
});

const dispatchMap = dispatch => bindActionCreators(actionCreators, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign({}, ownProps, stateProps, dispatchProps, {
	id: guid(),
});

class ButtonMenu extends React.PureComponent {
	constructor(props) {
		super(props);

		this.list = null;
	}

	componentWillMount() {
		this.props.init(this.props.id);
	}

	handleClick() {
		const listArea = ReactDOM.findDOMNode(this.list);

		if (listArea.contains(evt.target)) {
			// Click in
		} else {
			// click out
		}
	}

	render() {
		const wrapperClassName = this.props.wrapperClass ? `button-menu ${this.props.wrapperClass}` : 'button-menu';

		return (
			<div className={wrapperClassName}>
				<button className="delete is-large">
					<span><i className="fa fa-cog" /></span>
					<ul ref={list => {this.list = list}}>
						<li><a className="panel-block">Item</a></li>
						<li><a className="panel-block">Item</a></li>
						<li><a className="panel-block">Item</a></li>
						<li><a className="panel-block">Item</a></li>
					</ul>
				</button>
			</div>
		);
	}
}

export default connect(stateMap, dispatchMap, mergeProps)(ButtonMenu);
