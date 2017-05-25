import axios from 'axios';
import constants from '../constants.app';

export default class Api {
	constructor(options = {}) {
		const axiosOptions = { ...options, baseURL: constants.apiBaseUrl };

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
		return this.axios({
			method: method.toUpperCase(),
			url: Api.formatUrl(url),
			data,
		});
	}
}
