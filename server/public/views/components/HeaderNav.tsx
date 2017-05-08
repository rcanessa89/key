import * as React from 'react';

interface HeaderNavProps {
	logged: any,
};

export default class HeaderNav extends React.Component<HeaderNavProps, undefined> {
	render() {
		const right = this.props.logged ? (
			<div className="nav-right nav-menu">
				<a href="/account" className="nav-item">Account</a>
				<a href="/app" className="nav-item">Key App</a>
				<a href="/api/logout" className="nav-item">Log out</a>
			</div>
		) : (
			<div className="nav-right nav-menu">
				<a href="/" className="nav-item">Home</a>
				<a href="/signin" className="nav-item">Sign in</a>
				<a href="/login" className="nav-item">Login</a>
			</div>
		);

		return (
			<nav className="nav">
				<div className="nav-left">
					<a href="/" className="nav-item">
						<img src="http://placehold.it/112x28" />
					</a>
				</div>
				{right}
			</nav>
		);
	}
}