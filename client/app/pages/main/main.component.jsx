import React from 'react';
import { UIView } from 'ui-router-react';
import AppHeader from '../../components/app-header/AppHeader.component';
import AppNav from '../../components/app-nav/AppNav.component';
import MobileNav from '../../components/mobile-nav/MobileNav.component';
import Loading from '../../components/loading/Loading.component';

export default () => (
	<div className="main-page">
		<AppHeader />
		<MobileNav />
		<div className="main-page-row">
			<div className="main-page-col main-page-col-1">
				<AppNav />
			</div>
			<div className="main-page-col main-page-col-2">
				<div className="app-main-container">
					<UIView />
					<Loading />
				</div>
			</div>
		</div>
	</div>
);
