import * as React from 'react';
import Index from './index';
import TextField from './components/TextInput';

export default class Login extends React.Component<undefined, undefined> {
	render() {
		return (
			<Index
				title="Password Set Up"
				script="password"
				wrapperClass="password-page"
			>
				<section className="hero is-medium is-info is-bold">
					<div className="hero-body">
						<div className="container">
							<h1 className="title">Password Set Up</h1>
							<h2 className="subtitle">Lorem Ipsum is simply dummy text of the printing and typesetting industry</h2>
						</div>
					</div>
				</section>

				<section className="section">
					<div className="container">
						<div className="heading">
							<h1 className="title">Password Set Up Form</h1>
						</div>
						<hr />
					</div>
				</section>

				<section className="container">
					<form id="password-form">
						<div className="columns">
							<div className="column is-half">
								<TextField
									id="password"
									name="password"
									placeholder="Password..."
									label="Password"
									type="password"
								/>
								<TextField
									id="password-copy"
									name="password_copy"
									placeholder="Repeat the password..."
									label="Repeat the password"
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
