import actions from './actions';
import peopleService from './people.service';

const setFilterOption = payload => ({
	type: actions.setFilterOption,
	payload,
});

const search = payload => ({
	type: actions.search,
	payload,
});

const setRegistries = payload => ({
	type: actions.setRegistries,
	payload,
});

const loadMoreRegistries = payload => ({
	type: actions.loadMore,
	payload,
});

// Async
const getPeopleRegistries = payload => (dispatch) => {
	peopleService.getRegistries(payload)
		.then((registries) => {
			if (payload) {
				dispatch(loadMoreRegistries(registries));
			} else {
				dispatch(setRegistries(registries));
			}
		});
};

export {
	setFilterOption,
	search,
	setRegistries,
	getPeopleRegistries,
	loadMoreRegistries,
};
