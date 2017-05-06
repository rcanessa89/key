(function ($) {
	var formId = '#company-register-form',
		modalId = '#company-register-form-success-modal',
		errorContainerId = '#company-register-form-error-container';

	app.addModalOnClose(modalId, app.goHome);

	var validateOptions = {
		rules: {
			company: {
				required: true
			},

			email: {
				required: true,
				email: true
			},

			name: {
				required: true
			},

			last_name: {
				required: true
			}
		},

		messages: {
			company: 'Company name is required',
			email: {
				required: 'Email is required',
				email: 'Invalid email'
			},
			name: 'Admin name is required',
			last_name: 'Admin last name is required',
		},

		errorClass: 'help is-danger'
	};

	var photo = null;

	var onChangePhotoInput = function() {
		var file = document.getElementById('admin-photo'),
			reader = new FileReader();

		reader.readAsDataURL(file['files'][0]);

		reader.onload = function() {
			photo = {
				fileName: file['value'].replace(/.*[\/\\]/, ''),
				base64: reader.result,
				type: reader.result.split(';')[0].split(':')[1],
				format: reader.result.split(';')[0].split(':')[1].split('/')[1]
			};

			document.getElementById('photo-name').innerHTML = photo.fileName;
		};
	};

	var submitForm = function(validator) {
		var form = app.submitForm(validator, formId);

		if (form.isValid) {
			app.apiCall('post', '/company/company-admin', {
					company: form.values.company,
					name: form.values.name,
					last_name: form.values.last_name,
					email: form.values.email,
					photo: photo
				})
				.then(function(res) {
					if ($.isEmptyObject(res)) {
						$(modalId).addClass('is-active');
					} else {
						app.showFormErrors(errorContainerId, res);
					}
				});
		}
	};

	$(document).ready(function() {
		$('#form-submit-button').on('click', submitForm.bind(this, $(formId).validate(validateOptions)));
		$('#admin-photo').on('change', onChangePhotoInput);
	});
})($);