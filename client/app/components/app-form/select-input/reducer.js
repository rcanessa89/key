import actions from './actions';

export default (state = {}, action) => {
	switch (action.type) {
	case actions.init:
		return { ...state, [action.payload.id]: action.payload };

	case actions.destroy: {
		const newState = { ...state };
		delete newState[action.payload];
		return newState;
	}

	case actions.onChange:
		return { ...state, [action.payload.id]: action.payload };

	default:
		return state;
	}
};
