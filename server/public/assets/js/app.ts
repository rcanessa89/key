var app: any = {};

(function($) {
	app.apiCall = apiCall;
	app.getParameterByName = getParameterByName;

	function apiCall(method, url, data) {
		var baseUrl = 'http://localhost:8000/api';

		return $.ajax({
			method: method.toUpperCase(),
			url: baseUrl + url,
			data: data || null
		});
	}

	function getParameterByName(name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}
})($);
