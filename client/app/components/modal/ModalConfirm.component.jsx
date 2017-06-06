import React from 'react';
import PropTypes from 'prop-types';
import AppButton from '../app-button/AppButton.component';

const propTypes = {
    message: PropTypes.string,
    confirm: PropTypes.func.isRequired,
    cancel: PropTypes.func,
	close: PropTypes.func.isRequired,
};

const defaultProps = {
    cancel: () => false,
	message: 'Are you sure?',
};

const ModalConfirm = (props) => {
	const ratioClassName = `image is-${props.ratio}`;

    const close = () => {
        props.cancel();
        props.close();
    }

	return (
		<div className="modal-content">
			<div className="modal-confirm">
                <p className="message">{props.message}</p>
                <div className="buttons-container">
                    <AppButton
                        text="Confirm"
                        state="danger"
                        action={props.confirm}
                    />
                    <AppButton
                        text="Cancel"
                        action={close}
                    />
                </div>
            </div>
		</div>
	);
};

ModalConfirm.propTypes = propTypes;
ModalConfirm.defaultProps = defaultProps;

export default ModalConfirm;