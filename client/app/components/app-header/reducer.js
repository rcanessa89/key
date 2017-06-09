import actions from './actions';

const initialState = {
	title: '',
	showMenu: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
	case actions.setTitle:
		return { ...state, title: action.payload };
	case actions.setShowMenu:
		return { ...state, showMenu: action.payload };
	default:
		return state;
	}
};
