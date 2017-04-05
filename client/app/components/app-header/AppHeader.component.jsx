import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './action-creators';
import capitalizeFirst from '../../util/capitalize-first';

export default () => (
	<div className="app-header">
		<div className="header-section logo-container">
			<a>
				KEY
			</a>
		</div>
		<div className="header-section route-text-container">
			<h2>Router Text</h2>
		</div>
		<div className="header-section menu-button-container">
			<span className="nav-toggle">
				<span></span>
				<span></span>
				<span></span>
			</span>
		</div>
	</div>
);
