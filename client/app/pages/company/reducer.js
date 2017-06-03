import actions from './actions';

const initialState = {
	company: null,
	filter: {
		department: { name: 'All', hosts: [] },
		search: '',
	},
	searchHost: ''
};

export default (state = initialState, action) => {
	switch (action.type) {
		case actions.setLogged:
			return { ...state, company: action.payload };
		case actions.filterByDepartment:
			return { ...state,
				filter: { ...state.filter,
					department: action.payload,
				}
			}
		case actions.searchDepartment:
			return { ...state,
				filter: { ...state.filter,
					search: action.payload,
				},
			};
		case actions.searchHost:
			return { ...state, searchHost: action.payload }; 
		case actions.resetFilterDepartment: 
			return { ...initialState, company: state.company };
		default:
			return state;
	}
};
