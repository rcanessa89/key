(function($) {
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
		if (validator.form()) {
			var inputs = $('#password-form :input'),
				values: any = {};

			inputs.each(function() {
				if (this.name) {
					values[this.name] = $(this).val();
				}
			});

			console.log(values);

			app.apiCall('post', '/password', {
					password: (<HTMLInputElement>document.getElementById('password')).value,
					userToken: app.getParameterByName('user_token')
				})
				.then(function(res) {
					window.location.href = '/';
				});
		}
	};

	$(document).ready(function() {
		$('#form-submit-button').on('click', submitForm.bind(this, $('#password-form').validate(validateOptions)));
	});
})($);