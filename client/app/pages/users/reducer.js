import actions from './actions';

const initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
	case actions.createUser:
		return state;
	case actions.deleteUser:
		return state;
	case actions.editUser:
		return state;
	default:
		return state;
	}
};
