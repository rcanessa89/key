import actions from './actions';
import peopleService from './people.service';

const intialState = {
	filter: {
		currentOption: peopleService.filterOptions.all,
		search: '',
	},
	registries: {
		docs: [],
		page: 0,
		pages: 0,
		total: 0,
	},
};

export default (state = intialState, action) => {
	switch (action.type) {
	case actions.setFilterOption:
		return {
			...state,
			filter: {
				...state.filter,
				currentOption: action.payload,
			},
		};
	case actions.search:
		return {
			...state,
			filter: {
				...state.filter,
				search: action.payload,
			},
		};
	case actions.setRegistries:
		return {
			...state,
			registries: {
				docs: [
					...action.payload.docs,
				],
				page: Number(action.payload.page),
				pages: action.payload.pages,
				total: action.payload.total,
			},
		};
	case actions.loadMore:
		return {
			...state,
			registries: {
				docs: [
					...state.registries.docs,
					...action.payload.docs,
				],
				page: Number(action.payload.page),
				pages: action.payload.pages,
				total: action.payload.total,
			},
		};
	default:
		return state;
	}
};
