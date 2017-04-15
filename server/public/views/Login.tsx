import * as React from 'react';
import Index from './index';

export default class Login extends React.Component<undefined, undefined> {
	render() {
		return (
			<Index
				title="Log in"
				script="login"
			>
				<div>
					<h1>Login</h1>
				</div>
			</Index>
		);
	}
}
