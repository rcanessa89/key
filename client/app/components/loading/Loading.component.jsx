import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
	loading: PropTypes.bool.isRequired,
};

const defaultProps = {
	loading: false,
};

const stateMap = state => ({
	loading: state.fetching,
});

const Loading = (props) => {
	const classNames = classnames({
		'app-loading': true,
		'is-loading': props.loading,
	});

	return (
		<div className={classNames}>
			<div className="app-loader" />
		</div>
	);
};

Loading.propTypes = propTypes;
Loading.defaultProps = defaultProps;

export default connect(stateMap)(Loading);
