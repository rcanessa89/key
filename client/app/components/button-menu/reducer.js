import actions from './actions';

const initialState = {};

export default (state = initialState, action) => {
	switch (action.type) {
	case action.init:
		return { ...state, [action.payload]: false };
	case action.destroy:
		const newState = { ...state };
		delete newState[action.payload];
		return newState;
	case action.change:
		return { ...state, [action.payload.id]: action.payload.value };
	default:
		return state;
	}
}
