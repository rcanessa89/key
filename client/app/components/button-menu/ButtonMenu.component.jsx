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
	wrapperClass: React.PropTypes.string,
	side: PropTypes.oneOf(['right', 'left']),
	items: PropTypes.arrayOf(PropTypes.shape({
		text: PropTypes.string,
		action: PropTypes.func,
	})).isRequired,
};

const defaultProps = {
	side: 'right',
};

const stateMap = (state, ownProps) => ({
	menus: state.buttonMenus,
});

const dispatchMap = dispatch => bindActionCreators(actionCreators, dispatch);

class ButtonMenu extends React.PureComponent {
	constructor(props) {
		super(props);

		this.list = null;
		this.id = guid();
		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);
		this.handleDocumentClick = this.handleDocumentClick.bind(this);
	}

	componentWillMount() {
		this.props.init(this.id);
	}

	componentDidMount() {
		window.addEventListener('click', this.handleDocumentClick)
	}

	componentWillUnmount() {
		this.props.destroy(this.id);
		window.removeEventListener('click', this.handleDocumentClick)
	}

	handleDocumentClick(evt) {
		const listArea = ReactDOM.findDOMNode(this.refs.list);

		if (!listArea.contains(evt.target)) {
			this.hide();
		}
	}

	show() {
		if (!this.props.menus[this.id]) {
			this.props.change({
				id: this.id,
				value: true,
			});
		}
	}

	hide() {
		if (this.props.menus[this.id]) {
			this.props.change({
				id: this.id,
				value: false,
			});
		}
	}

	render() {
		const listClassName = classnames({
			'is-active': this.props.menus[this.id],
			'button-menu': true,
			[this.props.wrapperClass]: this.props.wrapperClass,
			'is-right': this.props.side === 'right',
			'is-left': this.props.side === 'left',
		});

		const items = this.props.items.map((item, index) => {
			return (
				<li
					key={`menu-item-${index}`}
					onClick={() => { item.action(); this.hide(); }}
				>
						<a className="panel-block">{item.text}</a>
				</li>
			);
		});

		return (
			<div ref="list" className={listClassName}>
				<button className="delete is-large" onClick={this.show}>
					<span><i className="fa fa-cog" /></span>
				</button>
				<ul>
					{items}
				</ul>
			</div>
		);
	}
}

ButtonMenu.propTypes = propTypes;
ButtonMenu.defaultProps = defaultProps;

export default connect(stateMap, dispatchMap)(ButtonMenu);
