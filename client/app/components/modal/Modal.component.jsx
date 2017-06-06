import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './action-creators';
import ModalImage from './ModalImage.component';
import ModalCard from './ModalCard.component';
import ModalConfirm from './ModalConfirm.component';

const types = {
	normal: 'normal',
	img: 'image',
	card: 'card',
	confirm: 'confirm',
};

const propTypes = {
	type: PropTypes.oneOf([types.normal, types.img, types.card, types.confirm]),
	modalId: PropTypes.string.isRequired,
	modalButton: PropTypes.element,
	isOpen: PropTypes.bool.isRequired,
	init: PropTypes.func.isRequired,
	children: PropTypes.element,
	open: PropTypes.func.isRequired,
	close: PropTypes.func.isRequired,
	destroy: PropTypes.func.isRequired,
	ratio: PropTypes.string,
	source: PropTypes.string,
	title: PropTypes.string,
	footer: PropTypes.element,
	confirm: PropTypes.func.isRequired,
	cancel: PropTypes.func,
	message: PropTypes.string,
};

const defaultProps = {
	type: types.normal,
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

		if (this.props.type === types.normal) {
			content = (<div className="modal-content">{this.props.children}</div>);
		} else if (this.props.type === types.img) {
			content = <ModalImage ratio={this.props.ratio} source={this.props.source} />;
		} else if (this.props.type === types.card) {
			content = <ModalCard title={this.props.title} footer={this.props.footer} close={this.close}>{this.props.children}</ModalCard>;
		} else if (this.props.type === types.confirm) {
			content = <ModalConfirm message={this.props.message} close={this.close} cancel={this.props.cancel} confirm={this.props.confirm} />
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
