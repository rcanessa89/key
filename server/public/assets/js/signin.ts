(function ($) {
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
		}
	}

	var submitForm = function(validator) {
		if (validator.form()) {
			var inputs = $('#company-register-form :input'),
				values: any = {};

			inputs.each(function() {
				if (this.name) {
					values[this.name] = $(this).val();
				}
			});

			app.apiCall('post', '/company/company-admin', { 
					company: values.company,
					name: values.name,
					last_name: values.last_name,
					email: values.email,
					rol: 'super_admin',
					photo: photo
				})
				.then(function(res) {
					console.log(res);
				});
		}
	}

	$(document).ready(function() {
		$('#form-submit-button').on('click', submitForm.bind(this, $('#company-register-form').validate(validateOptions)));
		$('#admin-photo').on('change', onChangePhotoInput);
	});
})($);