import React from 'react';
import PropTypes from 'prop-types';
import { UISref } from 'ui-router-react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { close } from '../mobile-nav/action-creators';
import Icon from '../icon/Icon.component';

const propTypes = {
	isOpen: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
};

const stateMap = state => ({
	isOpen: state.mobileNav,
});

const dispatchMap = dispatch => ({
	close: () => dispatch(close()),
});

const MobileNav = (props) => {
	const mobileNavClassName = classnames({
		'mobile-nav': true,
		'is-open': props.isOpen,
	});

	return (
		<div className={mobileNavClassName}>
			<p>Admin</p>
			<ul>
				<li>
					<UISref to="main.company">
						<a><span onClick={props.close}><Icon size="medium" icon="building" />Company</span></a>
					</UISref>
				</li>
				<li>
					<UISref to="main.users">
						<a><span onClick={props.close}><Icon size="medium" icon="user-circle" />Users</span></a>
					</UISref>
				</li>
				<li>
					<UISref to="main.departments">
						<a><span onClick={props.close}><Icon size="medium" icon="cubes" />Departments</span></a>
					</UISref>
				</li>
				<li>
					<UISref to="main.hosts">
						<a><span onClick={props.close}><Icon size="medium" icon="users" />Hosts</span></a>
					</UISref>
				</li>
			</ul>
			<p>Registries</p>
			<ul>
				<li>
					<UISref to="main.people">
						<a><span onClick={props.close}><Icon size="medium" icon="address-book" />People</span></a>
					</UISref>
				</li>
				<li>
					<UISref to="main.assets">
						<a><span onClick={props.close}><Icon size="medium" icon="laptop" />Assets</span></a>
					</UISref>
				</li>
			</ul>
		</div>
	);
};

MobileNav.propTypes = propTypes;

export default connect(stateMap, dispatchMap)(MobileNav);
