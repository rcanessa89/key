import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './action-creators';
import ModalImage from './ModalImage.component';
import ModalCard from './ModalCard.component';

const propTypes = {
	type: React.PropTypes.oneOf(['normal', 'image', 'card']),
	modalId: React.PropTypes.string.isRequired,
	modalButton: React.PropTypes.element,
	isOpen: React.PropTypes.bool.isRequired,
	init: React.PropTypes.func.isRequired,
	children: React.PropTypes.element,
	open: React.PropTypes.func.isRequired,
	close: React.PropTypes.func.isRequired,
	destroy: React.PropTypes.func.isRequired,
	ratio: React.PropTypes.string,
	source: React.PropTypes.string,
	title: React.PropTypes.string,
	footer: React.PropTypes.element,
};

const defaultProps = {
	type: 'normal',
	modalButton: null,
	children: <div />,
	isOpen: false,
	ratio: null,
	source: null,
	title: null,
	footer: null,
};

const stateMap = (state, ownProps) => ({
	isOpen: state.modal[ownProps.modalId],
});

const dispatchMap = dispatch => bindActionCreators(actionCreators, dispatch);

class Modal extends React.PureComponent {
	constructor() {
		super();
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
	}

	componentWillMount() {
		this.props.init(this.props.modalId);
	}

	componentWillUnmount() {
		this.props.destroy(this.props.modalId);
	}

	getModalContent() {
		let content = null;

		if (this.props.type === 'normal') {
			content = (<div className="modal-content">{this.props.children}</div>);
		} else if (this.props.type === 'image') {
			content = <ModalImage ratio={this.props.ratio} source={this.props.source} />;
		} else if (this.props.type === 'card') {
			content = <ModalCard title={this.props.title} footer={this.props.footer} close={this.close}>{this.props.children}</ModalCard>;
		}

		return content;
	}

	close() {
		this.props.close(this.props.modalId);
	}

	open() {
		this.props.open(this.props.modalId);
	}

	render() {
		const isOpenClassName = this.props.isOpen ? 'modal is-active' : 'modal';
		const button = this.props.modalButton ? React.cloneElement(this.props.modalButton, { ...this.props.modalButton.props, action: this.open }) : null;
		const closeButton = this.props.type === 'card' ? null : <button className="modal-close" onClick={this.close} />;

		return (
			<div className="app-modal">
				{button}
				<div className={isOpenClassName}>
					<div className="modal-background" onClick={this.close} />
					{this.getModalContent()}
					{closeButton}
				</div>
			</div>
		);
	}
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default connect(stateMap, dispatchMap)(Modal);
