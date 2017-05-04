import * as React from 'react';
import Index from './index';
import TextField from './components/TextInput';

export default class Login extends React.Component<undefined, undefined> {
	render() {
		return (
			<Index
				title="Log in"
				script="login"
				wrapperClass="login-page"
			>
				<section className="section">
					<div className="container">
						<div className="heading">
							<h1 className="title">Log In</h1>
						</div>
						<hr />
					</div>
				</section>

				<section className="container">
					<form id="login-form">
						<div className="columns">
							<div className="column is-half">
								<TextField
									id="login-email"
									name="login_email"
									placeholder="Email..."
									label="Email"
								/>
								<TextField
									id="login-password"
									name="login_password"
									placeholder="Password..."
									label="Password"
									type="password"
								/>
								<div className="field is-grouped">
									<p className="control"><button id="form-submit-button" type="button" className="button is-primary">Submit</button></p>
								</div>
							</div>
						</div>
					</form>
				</section>
			</Index>
		);
	}
}
