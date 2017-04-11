import actions from './actions';

const open = () => ({
	type: actions.open,
});

const close = () => ({
	type: actions.close,
});

const toggle = () => ({
	type: actions.toggle,
});

export { open, close, toggle };
