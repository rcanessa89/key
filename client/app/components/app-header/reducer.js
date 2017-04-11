import actions from './actions';

const initialState = {
	title: '',
};

export default (state = initialState, action) => {
	switch (action.type) {
	case actions.setTitle:
		return { ...state, title: action.payload };
	default:
		return state;
	}
};
