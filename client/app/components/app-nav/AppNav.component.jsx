import React from 'react';
import PropTypes from 'prop-types';
import { UISref, UISrefActive } from 'ui-router-react';

export default () => (
	<div className="app-nav">
		<aside className="menu">
			<p className="menu-label">Admin</p>
			<ul className="menu-list">
				<li>
					<UISrefActive class="is-active">
						<UISref to="main.company">
							<a>
								<span className="icon"><i className="fa fa-building" /></span>
								Company
							</a>
						</UISref>
					</UISrefActive>
				</li>
				<li>
					<UISrefActive class="is-active">
						<UISref to="main.users">
							<a>
								<span className="icon"><i className="fa fa-user-circle" /></span>
								Users
							</a>
						</UISref>
					</UISrefActive>
				</li>
				<li>
					<UISrefActive class="is-active">
						<UISref to="main.departments">
							<a>
								<span className="icon"><i className="fa fa-cubes" /></span>
								Departments
							</a>
						</UISref>
					</UISrefActive>
				</li>
				<li>
					<UISrefActive class="is-active">
						<UISref to="main.hosts">
							<a>
								<span className="icon"><i className="fa fa-users" /></span>
								Hosts
							</a>
						</UISref>
					</UISrefActive>
				</li>
			</ul>
			<p className="menu-label">Registries</p>
			<ul className="menu-list">
				<li>
					<UISrefActive class="is-active">
						<UISref to="main.people">
							<a>
								<span className="icon"><i className="fa fa-address-book" /></span>
								People
							</a>
						</UISref>
					</UISrefActive>
				</li>
				<li>
					<UISrefActive class="is-active">
						<UISref to="main.assets">
							<a>
								<span className="icon"><i className="fa fa-laptop" /></span>
								Assets
							</a>
						</UISref>
					</UISrefActive>
				</li>
			</ul>
		</aside>
	</div>
);
