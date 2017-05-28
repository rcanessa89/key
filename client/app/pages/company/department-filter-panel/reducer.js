import actions from './actions';

const initialState = {
	department: { name: 'All' },
	search: ''
};

export default (state = initialState, action) => {
	switch (action.type) {
	case actions.search:
		return { ...state, search: action.payload };
	case actions.filterByDepartment:
		return { ...state, department: action.payload };
	case actions.reset:
		return initialState;
	default:
		return state;
	}
};
