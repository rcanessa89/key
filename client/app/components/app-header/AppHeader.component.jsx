import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { toggle } from '../mobile-nav/action-creators';

const propTypes = {
	mobileNav: React.PropTypes.bool.isRequired,
	toggleNav: React.PropTypes.func.isRequired,
	pageTitle: React.PropTypes.string.isRequired,
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
				<a>
					KEY
				</a>
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
			</div>
		</div>
	);
};

AppHeader.propTypes = propTypes;

export default connect(stateMap, dispatchMap)(AppHeader);
