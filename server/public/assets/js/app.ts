var app: any = {};

(function($) {
	// Public methods
	app.apiCall = apiCall;
	app.getParameterByName = getParameterByName;
	app.submitForm = submitForm;
	app.showFormErrors = showFormErrors;
	app.addModalOnClose = addModalOnClose;
	app.goHome = goHome;
	app.user = apiCall('get', '/user/logged', null);
	app.isValidEmail = isValidEmail;

	$(document).ready(function() {
		setPasswordValidation();
		addModalClose();
	});

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

	function setPasswordValidation() {
		// Minimum 8 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet and 1 Number
		$['validator'].addMethod('pwcheck', function(value) {
			return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value);
		});
	}

	function showFormErrors(container, errors) {
		var errorList = getFormErrorList(errors);

		$(container + ' .message-body').empty();
		$(container + ' .message-body').append(errorList);
		$(container).show();
	}

	function getFormErrorList(errors) {
		var list = '<ul>';

		if (Array.isArray(errors)) {
			$(errors).each(function(index, error) {
				list = list + '<li>' + error + '</li>';
			});
		} else {
			$.each(errors, function(key, value) {
				list = list + '<li>' + value + '</li>';
			});
		}

		list = list + '</ul>';

		return list;
	}

	function addModalClose() {
		$('.modal-background, .modal-close, .modal-card-head .delete').on('click', function() {
			$('.modal').removeClass('is-active');
		});
	}

	function addModalOnClose(selector, onModalClose) {
		$(selector + ' .modal-background, ' + selector + ' .modal-close').on('click', onModalClose);
	}

	function goHome() {
		window.location.href = '/';
	}

	function isValidEmail(email) {
		var emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

		return emailRegex.test(email);
	}
})($);
