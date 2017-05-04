(function($) {
	var validateOptions = {
		rules: {
			email: {
				required: true,
				email: true
			},

			password: {
				required: true
			}
		},

		messages: {
			email: {
				required: 'Email is required',
				email: 'Email invalid'
			},

			password: 'Password is required',
		},

		errorClass: 'help is-danger'
	};

	var submitLogin = function(validator) {
		var form = app.submitForm(validator, '#login-form');

		if (form.isValid) {
			app.apiCall('post', '/login', form.values)
				.then(function(res) {
					console.log(res);

					if (res.status) {
						//window.location.href = '/';
					}
				});
		}
	};

	$(document).ready(function() {
		$('#form-submit-button').on('click', submitLogin.bind(this, $('#login-form').validate(validateOptions)));
	});
})($);