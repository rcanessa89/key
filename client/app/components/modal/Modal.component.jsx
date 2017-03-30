import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './action-creators';

const propTypes = {
	type: React.PropTypes.oneOf(['normal', 'image', 'card']),
	modalId: React.PropTypes.string.isRequired,
	modalButton: React.PropTypes.element,
	isOpen: React.PropTypes.bool.isRequired,
	init: React.PropTypes.func.isRequired,
	children: React.PropTypes.element,
};

const defaultProps = {
	type: 'normal',
	modalButton: null,
	children: <div />,
};

const stateMap = (state, ownProps) => ({
	isOpen: state.modal[ownProps.modalId],
});

const dispatchMap = dispatch => bindActionCreators(actionCreators, dispatch);

class Modal extends React.PureComponent {
	componentWillMount() {
		this.props.init(this.props.modalId);
	}

	render() {
		const isOpenClassName = this.props.isOpen ? 'modal is-active' : 'modal';
		const button = this.props.modalButton ? React.cloneElement(this.props.modalButton, { ...this.props.modalButton.props, action: this.props.open.bind(this, this.props.modalId) }) : null;

		return (
			<div className="app-modal">
				{button}
				<div className={isOpenClassName}>
					<div className="modal-background" onClick={this.props.close.bind(this, this.props.modalId)} />
					<div className="modal-content">
						{this.props.children}
					</div>
					<button className="modal-close" onClick={this.props.close.bind(this, this.props.modalId)} />
				</div>
			</div>
		);
	}
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default connect(stateMap, dispatchMap)(Modal);
