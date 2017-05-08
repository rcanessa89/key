import * as React from 'react';
import Index from './index';
import TextField from './components/TextInput';
import Modal from './components/Modal';

export default class Signin extends React.Component<undefined, undefined> {
	render() {
		return (
			<Index
				title="Sign in"
				script="signin"
				wrapperClass="signin-page"
			>
				<section className="hero is-medium is-info is-bold">
					<div className="hero-body">
						<div className="container">
							<h1 className="title">Register</h1>
							<h2 className="subtitle">Lorem Ipsum is simply dummy text of the printing and typesetting industry</h2>
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
									name="last_name"
									placeholder="Last name..."
									label="Admin Last Name"
								/>
								<div className="field text-field">
									<label className="label">Admin Photo</label>
									<label className="button" htmlFor="admin-photo">Upload...</label>
									<span id="photo-name"></span>
									<input style={{display: 'none'}} id="admin-photo" type="file" />
								</div>
								<div id="company-register-form-error-container" className="field error-field">
									<article className="message is-danger">
										<div className="message-body"></div>
									</article>
								</div>
								<div className="field is-grouped">
									<div className="g-recaptcha"
										data-sitekey="6LdPXCAUAAAAAEs1a3KzqtlLpaOnDZn8EW3HwTWZ"
										data-callback="testRecaptcha"
										data-size="invisible">
									</div>
									<p className="control"><button id="form-submit-button" type="button" className="button is-primary">Submit</button></p>
									<p className="control"><a href="/" className="button is-link">Cancel</a></p>
								</div>
							</div>
						</div>
					</form>
				</section>
				<Modal modalId="company-register-form-success-modal">
					<article className="message is-info">
						<div className="message-header">
							<p>Info</p>
						</div>
						<div className="message-body">
							Confirmation sended.
						</div>
					</article>
				</Modal>
			</Index>
		);
	}
}
