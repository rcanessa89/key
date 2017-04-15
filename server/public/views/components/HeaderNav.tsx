import * as React from 'react';

export default class HeaderNav extends React.Component<undefined, undefined> {
	render() {
		return (
			<nav className="nav">
				<div className="nav-left">
					<a href="/" className="nav-item">
						<img src="http://placehold.it/112x28" />
					</a>
				</div>
				<div className="nav-right nav-menu">
					<a href="/" className="nav-item">Home</a>
					<a href="/signin" className="nav-item">Sign in</a>
					<a href="/login" className="nav-item">Login</a>
				</div>
			</nav>
		);
	}
}