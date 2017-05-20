import * as React from 'react';

interface ModalProps {
	modalId: string,
};

export default class Modal extends React.Component<ModalProps, {}> {
	render() {
		return (
			<div id={this.props.modalId} className="modal">
				<div className="modal-background"></div>
				<div className="modal-content">
					{this.props.children}
				</div>
				<button className="modal-close"></button>
			</div>
		)
	}
}