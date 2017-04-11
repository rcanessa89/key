import actions from './actions';

export default (state = false, action) => {
	switch (action.type) {
	case actions.open:
		return true;
	case actions.close:
		return false;
	case actions.toggle:
		return !state;
	default:
		return state;
	}
};
