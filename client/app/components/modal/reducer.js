import actions from './actions';

const initialState = {};

export default (state = initialState, action) => {
	switch (action.type) {
	case actions.init:
		return { ...state, [action.payload]: false };

	case '1': {
		const newState = { ...state };
		delete newState[action.payload];
		return newState;
	}

	case actions.open:
		return { ...state, [action.payload]: true };

	case actions.close:
		return { ...state, [action.payload]: false };

	case actions.toggle:
		return { ...state, [action.payload]: !state[action.payload] };

	default:
		return state;
	}
};
