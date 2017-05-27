import actions from './actions';

const initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
		case actions.setUsers:
			return action.payload;
		default:
			return state;
	}
};
