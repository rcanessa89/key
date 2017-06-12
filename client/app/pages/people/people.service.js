import Api from '../../services/Api';
import store from '../../store.app';

const api = new Api();

const filterOptions = {
	all: 'All',
	open: 'Open',
	closed: 'Closed',
};

const getRegistries = (page = 1) => {
	const url = `people/company/${store.getState().companyPage.company._id}/page/${page}`;

	return api.call('get', url);
};

export default {
	filterOptions,
	getRegistries,
};
