import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { UISref } from 'ui-router-react';
import { toggle } from '../mobile-nav/action-creators';
import { company } from '../../routes.app';
import DeskUserMenu from './DeskUserMenu.component';

const propTypes = {
	mobileNav: PropTypes.bool.isRequired,
	toggleNav: PropTypes.func.isRequired,
	pageTitle: PropTypes.string.isRequired,
};

const stateMap = state => ({
	mobileNav: state.mobileNav,
	pageTitle: state.header.title,
});

const dispatchMap = dispatch => ({
	toggleNav: () => dispatch(toggle()),
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
				<span className={mobileButtonClassName} onClick={props.toggleNav}>
					<span />
					<span />
					<span />
				</span>
				<DeskUserMenu />
			</div>
		</div>
	);
};

AppHeader.propTypes = propTypes;

export default connect(stateMap, dispatchMap)(AppHeader);
