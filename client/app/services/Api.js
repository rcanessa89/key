import axios from 'axios';
import env from '../env-variables.app';
import store from '../store.app';

const actions = {
	fetch: 'API_FETCH',
	fetchEnd: 'API_FETCH_END',
};

const getActionFetch = () => ({
	type: actions.fetch,
});

const getActionFetchEnd = () => ({
	type: actions.fetchEnd,
});

const fetchReducer = (state = false, action) => {
	switch (action.type) {
	case actions.fetch:
		return true;
	case actions.fetchEnd:
		return false;
	default:
		return state;
	}
};

export { fetchReducer };

export default class Api {
	constructor(options = {}) {
		const axiosOptions = { ...options, baseURL: env.apiBaseUrl };

		this.axios = axios.create(axiosOptions);
	}

	static formatUrl(url) {
		let fullUrl = null;

		if (url.charAt(0) === '/') {
			fullUrl = url;
		} else {
			fullUrl = `/${url}`;
		}

		return fullUrl;
	}

	call(method = 'get', url = '/', data = null) {
		let showLoading = true;

		setTimeout(() => {
			if (showLoading) {
				store.dispatch(getActionFetch());
			}
		}, 300);

		return new Promise((resolve, reject) => {
			this.axios({
				method: method.toUpperCase(),
				url: Api.formatUrl(url),
				data,
			})
			.then((res) => {
				showLoading = false;
				store.dispatch(getActionFetchEnd());

				resolve(res.data);
			}, error => reject(error))
			.catch(error => reject(error));
		});
	}
}
