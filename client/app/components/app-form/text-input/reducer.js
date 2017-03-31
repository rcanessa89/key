import actions from './actions';

const initialState = {
	textInput: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
	case actions.init:
		return { ...state, textInput: { ...state.textInput, [action.payload.id]: action.payload } };

	case actions.destroy: {
		const newState = { ...state };
		delete newState.textInput[action.payload];
		return newState;
	}

	case actions.onChange:
		return { ...state, textInput: { ...state.textInput, [action.payload.id]: action.payload } };

	default:
		return state;
	}
};
