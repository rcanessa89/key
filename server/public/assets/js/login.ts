(function($) {
	var formId = '#login-form',
		errorContainerId = '#login-form-error-container',
		forgotErrorContainerId = '#forgot-form-error-container',
		forgotFormId = '#forgot-form',
		forgotModalId = '#forgot-modal',
		forgotButtonId = '#forgot-button',
		successForgotButton = '#success-forgot-button';

	var validateOptions = {
		rules: {
			email: {
				required: true,
				email: true
			},

			password: {
				required: true,
				pwcheck: true
			}
		},

		messages: {
			email: {
				required: 'Email is required',
				email: 'Email invalid'
			},

			password: {
				required: 'Password is required',
				pwcheck: 'Minimum 8 characters at least 1 uppercase alphabet, 1 lowercase alphabet and 1 number'
			}
		},

		errorClass: 'help is-danger'
	};

	var forgotValideOptions = {
		rules: {
			email: {
				required: true,
				email: true
			}
		},

		messages: {
			email: {
				required: 'Email is required',
				email: 'Email invalid'
			}
		},

		errorClass: 'help is-danger'
	};

	var submitLogin = function(validator) {
		var form = app.submitForm(validator, formId);

		if (form.isValid) {
			app.apiCall('post', '/login', form.values)
				.then(function(res) {
					if ($.isEmptyObject(res)) {
						app.goHome();
					} else {
						app.showFormErrors(errorContainerId, res);
					}
				});
		}
	};

	var submitForgotPassword = function(validator) {
		var form = app.submitForm(validator, forgotFormId);

		if (form.isValid) {
			app.apiCall('post', '/password/forgot', form.values)
				.then(function(res) {
					if ($.isEmptyObject(res)) {
						app.goHome();
					} else {
						app.showFormErrors(forgotErrorContainerId, res);
					}
				});
		}
	};

	var showForgotModal = function() {
		$(forgotModalId).addClass('is-active');
	};

	$(document).ready(function() {
		$('#form-submit-button').on('click', submitLogin.bind(this, $(formId).validate(validateOptions)));
		$(forgotButtonId).on('click', showForgotModal);
		$(successForgotButton).on('click', submitForgotPassword.bind(this, $(forgotFormId).validate(forgotValideOptions)));
	});
})($);