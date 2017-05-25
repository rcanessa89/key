(function($) {
	var formId = '#password-form',
		modalId = '#password-form-success-modal',
		errorContainerId = '#company-register-form-error-container';

	app.addModalOnClose(modalId, app.goHome);

	var validateOptions = {
		rules: {
			password: {
				required: true,
				pwcheck: true
			},

			password_copy: {
				required: true,
				equalTo: '#password'
			}
		},

		messages: {
			password: {
				required: 'Password is required',
				pwcheck: 'Minimum 8 characters at least 1 uppercase alphabet, 1 lowercase alphabet and 1 number'
			},

			password_copy: {
				required: 'Reapeat the password is required',
				equalTo: 'Should be equal to password'
			}
		},

		errorClass: 'help is-danger'
	};

	var submitForm = function(validator) {
		var form = app.submitForm(validator, formId);

		if (form.isValid) {
			app.apiCall('post', '/password', {
					password: form.values.password,
					userToken: app.getParameterByName('user_token')
				})
				.then(function(res) {
					if (res.errors) {
						app.showFormErrors(errorContainerId, res.errors);
					} else {
						$(modalId).addClass('is-active');
					}
				});
		}
	};

	$(document).ready(function() {
		$('#form-submit-button').on('click', submitForm.bind(this, $(formId).validate(validateOptions)));
	});
})($);