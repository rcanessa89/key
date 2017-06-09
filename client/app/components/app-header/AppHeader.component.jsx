import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { UISref } from 'ui-router-react';
import { bindActionCreators } from 'redux';
import * as actionCreators from './action-creators';
import { toggle } from '../mobile-nav/action-creators';
import { company } from '../../routes.app';
import DeskUserMenu from './DeskUserMenu.component';

const propTypes = {
	mobileNav: PropTypes.bool.isRequired,
	pageTitle: PropTypes.string.isRequired,
	showMenu: PropTypes.bool.isRequired,
	dispatch: PropTypes.shape({
		toggleNav: PropTypes.func.isRequired,
		setShowMenu: PropTypes.func.isRequired,
	}),
};

const stateMap = state => ({
	mobileNav: state.mobileNav,
	pageTitle: state.header.title,
	showMenu: state.header.showMenu,
});

const dispatchMap = dispatch => ({
	dispatch: bindActionCreators({ ...actionCreators, toggleNav: toggle }, dispatch),
});

const AppHeader = (props) => {
	const mobileButtonClassName = classnames({
		'nav-toggle': true,
		'is-active': props.mobileNav,
	});

	return (
		<div className="app-header">
			<div className="header-section logo-container">
				<UISref to={company.name}>
					<a></a>
				</UISref>
			</div>
			<div className="header-section route-text-container">
				<h2>{props.pageTitle}</h2>
			</div>
			<div className="header-section menu-button-container">
				<span className={mobileButtonClassName} onClick={props.dispatch.toggleNav}>
					<span />
					<span />
					<span />
				</span>
				<DeskUserMenu
					showMenu={props.showMenu}
					setShowMenu={props.dispatch.setShowMenu}
				/>
			</div>
		</div>
	);
};

AppHeader.propTypes = propTypes;

export default connect(stateMap, dispatchMap)(AppHeader);
