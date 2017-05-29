import actions from './actions';

const initialState = {};

export default (state = initialState, action) => {
	switch (action.type) {
	case actions.init:
		return { ...state, [action.payload]: false };
	case actions.destroy:
		const newState = { ...state };
		delete newState[action.payload];
		return newState;
	case actions.change:
		return { ...state, [action.payload.id]: action.payload.value };
	default:
		return state;
	}
}
