import React from 'react';
import { UIView } from 'ui-router-react';
import AppHeader from '../../components/app-header/AppHeader.component';
import AppNav from '../../components/app-nav/AppNav.component';

export default () => (
	<div className="main-page">
		<AppHeader />
		<div className="main-page-row">
			<div className="main-page-col main-page-col-1">
				<AppNav />
			</div>
			<div className="main-page-col main-page-col-2">
				<div className="app-main-container">
					<UIView />
				</div>
			</div>
		</div>
	</div>
);
