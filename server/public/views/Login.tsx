import * as React from 'react';
import Index from './index';
import TextInput from './components/TextInput';
import ModalCard from './components/ModalCard';

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
								<TextInput
									id="login-email"
									name="email"
									placeholder="Email..."
									label="Email"
								/>
								<TextInput
									id="login-password"
									name="password"
									placeholder="Password..."
									label="Password"
									type="password"
								/>
								<div className="forgot-password-container">
									<a id="forgot-button" className="button is-link">forgot the password?</a>
								</div>
								<div id="login-form-error-container" className="field error-field">
									<article className="message is-danger">
										<div className="message-body"></div>
									</article>
								</div>
								<div className="field is-grouped">
									<p className="control"><button id="form-submit-button" type="button" className="button is-primary">Log In</button></p>
								</div>
							</div>
						</div>
					</form>
				</section>
				<ModalCard
					modalId="forgot-modal"
					title="Recover the password"
					successText="Send"
					successbuttonId="success-forgot-button"
					cancelbuttonId="cancel-forgot-button"
				>
					<form id="forgot-form">
						<TextInput
							id="forgot-email"
							name="email"
							placeholder="Your email..."
							label="Email"
						/>
					</form>
					<div id="forgot-form-error-container" className="field error-field">
						<article className="message is-danger">
							<div className="message-body"></div>
						</article>
					</div>
				</ModalCard>
			</Index>
		);
	}
}
