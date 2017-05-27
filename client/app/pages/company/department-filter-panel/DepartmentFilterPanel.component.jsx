import React from 'react';

export default () => {
	return (
		<nav className="panel">
			<p className="panel-heading">Departments</p>
			<div className="panel-block">
				<p className="control has-icons-left">
					<input className="input is-small" type="text" placeholder="Search" />
					<span className="icon is-small is-left"><i className="fa fa-search" /></span>
				</p>
			</div>
			<a className="panel-block">
				<span className="panel-icon"><i className="fa fa-book"></i></span>
				All
			</a>
			<div className="panel-block">
				<button className="button is-primary is-outlined">Create new department</button>
			</div>
		</nav>
	);
};
