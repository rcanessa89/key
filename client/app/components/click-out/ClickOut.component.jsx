import React from 'react';
import PropTypes from 'prop-types';
import guid from '../../util/guid';

const propTypes = {
	onOut: PropTypes.func.isRequired,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
		PropTypes.arrayOf(PropTypes.element),
		PropTypes.element,
	]).isRequired,
};

class ClickOut extends React.PureComponent {
	constructor() {
		super();

		this.id = guid();
		this[this.id] = null;
		this.clickOutHandler = this.clickOutHandler.bind(this);
		this.setRef = this.setRef.bind(this);
	}

	componentDidMount() {
		window.addEventListener('click', this.clickOutHandler);
	}

	componentWillUnmount() {
		window.removeEventListener('click', this.clickOutHandler);
	}

	setRef(el) {
		this[this.id] = el;
	}

	getEl() {
		return React.cloneElement(this.props.children, { ref: this.setRef }, this.props.children.props.children);
	}

	clickOutHandler(event) {
		if (!this[this.id].contains(event.target)) {
			this.props.onOut();
		}
	}

	render() {
		return this.getEl();
	}
}

ClickOut.propTypes = propTypes;

export default ClickOut;
