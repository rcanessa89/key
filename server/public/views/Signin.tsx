import * as React from 'react';
import Index from './index';
import TextField from './components/TextInput';

export default class Signin extends React.Component<undefined, undefined> {
	render() {
		return (
			<Index
				title="Sign in"
				script="signin"
			>

				<section className="hero is-medium is-info is-bold">
					<div className="hero-body">
						<div className="container">
							<h1 className="title">Register</h1>
							<h2 className="subtitle">Fill the fields with your company name and your admin info or use your <strong>Google</strong> account</h2>
						</div>
					</div>
				</section>

				<section className="section">
					<div className="container">
						<div className="heading">
							<h1 className="title">Company Form</h1>
						</div>
						<hr />
					</div>
				</section>

				<section className="container">
					<form id="company-register-form">
						<div className="columns">
							<div className="column is-half">
								<TextField
									id="account-company-field"
									name="company"
									placeholder="Company..."
									label="Company Name"
								/>
								<TextField
									id="account-admin-email-field"
									name="email"
									placeholder="admin@key.com..."
									label="Admin Email"
								/>
								<TextField
									id="account-admin-name-field"
									name="name"
									placeholder="Name..."
									label="Admin Name"
								/>
								<TextField
									id="account-admin-last-name-field"
									name="lastname"
									placeholder="Last name..."
									label="Admin Last Name"
								/>
								<div className="field is-grouped">
									<p className="control"><button type="submit" className="button is-primary">Submit</button></p>
									<p className="control"><a href="/" className="button is-link">Cancel</a></p>
								</div>
							</div>
						</div>
					</form>
				</section>

			</Index>
		);
	}
}
