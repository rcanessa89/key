import React from 'react';
import PropTypes from 'prop-types';
import capitalizeFirst from '../../util/capitalize-first';

const propTypes = {
	title: PropTypes.string,
	children: PropTypes.element.isRequired,
	footer: PropTypes.element,
	close: PropTypes.func.isRequired,
};

const defaultProps = {
	title: null,
	footer: null,
};

const ModalCard = (props) => {
	const footer = props.footer ? (<footer className="modal-card-foot">{props.footer}</footer>) : null;

	return (
		<div className="modal-card">
			<header className="modal-card-head">
				<p className="modal-card-title">{capitalizeFirst(props.title)}</p>
				<button className="delete" onClick={props.close} />
			</header>
			<section className="modal-card-body">
				{props.children}
			</section>
			{footer}
		</div>
	);
};

ModalCard.propTypes = propTypes;
ModalCard.defaultProps = defaultProps;

export default ModalCard;
