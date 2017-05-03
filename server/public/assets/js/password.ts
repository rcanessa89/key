(function($) {
	var validateOptions = {
		rules: {
			password: {
				required: true
			},

			password_copy: {
				required: true
			}
		},

		messages: {
			password: 'Company name is required',

			password_copy: {
				required: 'Reapeat the password is required',
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

			app.apiCall('post', '/password', { 
					
				})
				.then(function(res) {
					window.location.href = '/';
				});
		}
	}

	$(document).ready(function() {
		$('#form-submit-button').on('click', submitForm.bind(this, $('#password-form ').validate(validateOptions)));
	});
})($);