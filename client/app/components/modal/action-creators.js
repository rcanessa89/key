import actions from './actions';

const init = id => ({
	type: actions.init,
	payload: id,
});

const destroy = id => ({
	type: actions.destroy,
	payload: id,
});

const open = id => ({
	type: actions.open,
	payload: id,
});

const close = id => ({
	type: actions.close,
	payload: id,
});

const toggle = id => ({
	type: actions.toggle,
	payload: id,
});

export { init, destroy, open, close, toggle };
