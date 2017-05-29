import actions from './actions';

const init = payload => ({
	type: actions.init,
	payload,
});

const destroy = payload => ({
	type: actions.destroy,
	payload,
});

const change = payload => ({
	type: actions.change,
	payload,
});

export { init, destroy, change };
