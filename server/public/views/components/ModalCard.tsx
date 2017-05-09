import * as React from 'react';

interface ModalCardProps {
	modalId: string,
	successText: string,
	title: string,
	successbuttonId: string,
	cancelbuttonId: string
};

export default class ModalCard extends React.Component<ModalCardProps, {}> {
	render() {
		return (
			<div id={this.props.modalId} className="modal">
				<div className="modal-background"></div>
				<div className="modal-card">
					<header className="modal-card-head">
						<p className="modal-card-title">{this.props.title}</p>
						<button className="delete"></button>
					</header>
					<section className="modal-card-body">
						{this.props.children}
					</section>
					<footer className="modal-card-foot">
						<a id={this.props.successbuttonId} className="button is-success">{this.props.successText}</a>
						<a id={this.props.cancelbuttonId} className="button">Cancel</a>
					</footer>
				</div>
			</div>
		)
	}
}