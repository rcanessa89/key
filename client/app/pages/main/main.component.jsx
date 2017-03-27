import React from 'react';
import AppHeader from '../../components/app-header/AppHeader.component';
import AppNav from '../../components/app-nav/AppNav.component';

const mainPage = props => (
	<div className="main-page">
		<AppHeader />
		<div className="main-page-row">
			<div className="main-page-col-1">
				<AppNav />
			</div>
			<div className="main-page-col-2">
				<div className="container">
					{props.children}
				</div>
			</div>
		</div>
	</div>
);

export default mainPage;