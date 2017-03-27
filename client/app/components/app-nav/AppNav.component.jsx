import React from 'react';

export default () => (
	<div className="app-nav">
		<aside className="menu">
			<p className="menu-label">Admin</p>
			<ul className="menu-list">
				<li>
					<a>
						<span className="icon"><i className="fa fa-building" /></span>
						Company
					</a>
				</li>
				<li>
					<a>
						<span className="icon"><i className="fa fa-user-circle" /></span>
						Users
					</a>
				</li>
				<li>
					<a>
						<span className="icon"><i className="fa fa-cubes" /></span>
						Departments
					</a>
				</li>
				<li>
					<a>
						<span className="icon"><i className="fa fa-users" /></span>
						Hosts
					</a>
				</li>
			</ul>
			<p className="menu-label">Registries</p>
			<ul className="menu-list">
				<li>
					<a>
						<span className="icon"><i className="fa fa-address-book" /></span>
						People
					</a>
				</li>
				<li>
					<a>
						<span className="icon"><i className="fa fa-laptop" /></span>
						Assets
					</a>
				</li>
			</ul>
		</aside>
	</div>
);