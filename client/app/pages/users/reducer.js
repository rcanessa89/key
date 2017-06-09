import actions from './actions';

const initialState = {
	users: [],
	userEdit: null,
	seachValue: '',
};

export default (state = initialState, action) => {
	switch (action.type) {
	case actions.set:
		return { ...state, users: action.payload };
	case actions.setUser:
		return { ...state, users: [...state.users, action.payload] };
	case actions.setEdit:
		return { ...state, userEdit: action.payload };
	case actions.setUserEdited:
		return {
			...state,
			users: [
				...state.users.slice(0, action.payload.index),
				action.payload.user,
				...state.users.slice(action.payload.index + 1),
			],
		};
	case actions.resetEdit:
		return { ...state, userEdit: null };
	case actions.removeUser:
		return {
			...state,
			users: [
				...state.users.slice(0, action.payload),
				...state.users.slice(action.payload + 1),
			],
		};
	case actions.searchUser:
		return { ...state, seachValue: action.payload };
	default:
		return state;
	}
};
