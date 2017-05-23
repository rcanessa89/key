import actions from './actions';

const toggle = currentState => ({
	type: actions.toggle,
	payload: currentState,
});

const show = () => ({
	type: actions.show,
});

const hide = () => ({
	type: actions.hide,
});

export { toggle, show, hide };
