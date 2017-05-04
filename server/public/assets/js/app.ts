var app: any = {};

(function($) {
	app.apiCall = apiCall;
	app.getParameterByName = getParameterByName;
	app.submitForm = submitForm;

	function apiCall(method, url, data) {
		var baseUrl = 'http://localhost:8000/api';

		return $.ajax({
			method: method.toUpperCase(),
			url: baseUrl + url,
			data: data || null
		});
	}

	function submitForm(validator, formSelector) {
		var inputs = $(formSelector + ' :input'),
			values = {};

		inputs.each(function() {
			if (this.name) {
				values[this.name] = $(this).val();
			}
		});

		if (validator.form()) {
			return {
				isValid: true,
				values: values
			};
		}

		return {
			isValid: false,
			values: values
		};
	}

	function getParameterByName(name, url) {
		if (!url) {
			url = window.location.href;
		}

		name = name.replace(/[\[\]]/g, '\\$&');

		var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),

		results = regex.exec(url);

		if (!results) {
			return null;
		}

		if (!results[2]) {
			return '';
		}

		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}
})($);
