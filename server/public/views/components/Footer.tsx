import * as React from 'react';

export default class Footer extends React.Component<undefined, undefined> {
	render() {
		return (
			<footer className="footer">
				<div className="container">
					<div className="content has-text-centered">
						<p><strong>Key</strong> by R Canessa. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
						<p><a className="icon" href="https://github.com/rcanessa89/key" target="_blank"><i className="fa fa-github"></i></a></p>
					</div>
				</div>
			</footer>
		);
	}
}
