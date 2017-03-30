import React from 'react';

const propTypes = {
	ratio: React.PropTypes.oneOf(['square', '1by1', '4by3', '3by2', '16by9', '2by1']),
	source: React.PropTypes.string.isRequired,
};

const defaultProps = {
	ratio: 'square',
};

const ModalImage = (props) => {
	const ratioClassName = `image is-${props.ratio}`;

	return (
		<div className="modal-content">
			<figure className={ratioClassName}>
				<img src={props.source} alt="modal-content" />
			</figure>
		</div>
	);
};

ModalImage.propTypes = propTypes;
ModalImage.defaultProps = defaultProps;

export default ModalImage;
