const recaptchaCb;

(function($) {
	const formId = '#company-register-form',
		modalId = '#company-register-form-success-modal',
		errorContainerId = '#company-register-form-error-container';

	app.addModalOnClose(modalId, app.goHome);

	const validateOptions = {
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

	const validator = $(formId).validate(validateOptions);
	const photo = null;

	const onChangePhotoInput = function() {
		const file = document.getElementById('admin-photo'),
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

	recaptchaCb = function(token) {
		const form = app.submitForm(validator, formId);

		app.apiCall('post', '/company/company-admin', {
			recaptcha: token,
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
	};

	const submitForm = function() {
		const form = app.submitForm(validator, formId);

		if (form.isValid) {
			grecaptcha.execute();
		}
	};

	$(document).ready(function() {
		$('#form-submit-button').on('click', submitForm);
		$('#admin-photo').on('change', onChangePhotoInput);
	});
})($);