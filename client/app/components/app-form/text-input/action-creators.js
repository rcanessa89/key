import actions from './actions';

const init = state => ({
	type: actions.init,
	payload: state,
});

const destroy = id => ({
	type: actions.destroy,
	payload: id,
});

const onChange = state => ({
	type: actions.onChange,
	payload: state,
});

export { init, destroy, onChange };
