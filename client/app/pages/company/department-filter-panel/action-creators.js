import actions from './actions';

const filterByDepartment = payload => ({
	type: actions.filterByDepartment,
	payload,
});

const search = payload => ({
	type: actions.search,
	payload,
});

const reset = () => ({
	type: actions.reset,
});

export { filterByDepartment, search, reset };
