import actions from './actions';

const initialState = false;

export default (state = initialState, action) => {
	switch (action.type) {
		case actions.toggle:
			return !action.payload;
		case actions.show:
			return true;
		case actions.hide:
			return false;
		default:
			return state;
	}
}