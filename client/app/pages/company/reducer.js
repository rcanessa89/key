import actions from './actions';

const initialState = null;

export default (state = initialState, action) => {
	switch (action.type) {
		case actions.setLogged:
			return action.payload;
		default:
			return state;
	}
};
