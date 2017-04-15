import * as React from 'react';
import Index from './index';

export default class Signin extends React.Component<undefined, undefined> {
	render() {
		return (
			<Index
				title="Sign in"
				script="signin"
			>
				<div>
					<h1>Sign in</h1>
				</div>
			</Index>
		);
	}
}
