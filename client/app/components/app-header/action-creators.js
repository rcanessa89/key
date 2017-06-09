import actions from './actions';

const setTitle = payload => ({
	type: actions.setTitle,
	payload,
});

const setShowMenu = payload => ({
	type: actions.setShowMenu,
	payload,
});

export {
	setTitle,
	setShowMenu,
};
