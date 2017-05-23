(function($) {
	const currentValue = null,
		errorContainerId = '#error-container',
		photoInputId = '#photo-input';
	
	let userLogged = null;

	app.user
		.then(function(res) {
			userLogged = res;
		});

	const editValue = function() {
		if (!this.id) {
			return;
		}

		const editableId = this.id.replace(/edit-/g, 'value-'),
			valueEditableEl = $('#' + editableId);

		currentValue = {
			key: $('#' + this.id).parent().text(),
			value: valueEditableEl[0].innerHTML
		};

		valueEditableEl.attr('contenteditable', 'true');
		valueEditableEl.focus();
	};

	const validOnBlur = function(value) {
		const validation = {
			valid: true,
			error: ''
		};

		if (currentValue.key.trim().toLowerCase() === 'email' && !app.isValidEmail(value)) {
			validation.valid = false;
			validation.error = 'Invalid email';

		} else if (value === '') {
			validation.valid = false;
			validation.error = currentValue.key + 'is required';
		}

		return validation;

	};

	const removeContentEditable = function() {
		$(this).attr('contenteditable', 'false');

		const field = this.id.replace(/value-/g, '').toLowerCase(),
			value = this.innerHTML,
			validation = validOnBlur(value),
			payload = {};

		if (!validation.valid) {
			document.getElementById(this.id).innerHTML = currentValue.value;

			return app.showFormErrors(errorContainerId, [validation.error]);
		} else {
			$(errorContainerId).hide();
		}

		if (field === 'company') {
			field = 'name';

			payload['_id'] = userLogged.company._id;
			payload[field] = value;

			app.apiCall('patch', '/company', payload);
		} else {
			app.apiCall('patch', '/user', { _id: userLogged._id, [field]: value });
		}
	};

	const onChangePhotoInput = function() {
		app.toogleLoader();

		const file = document.getElementById('photo-input'),
			reader = new FileReader();

		reader.readAsDataURL(file['files'][0]);

		reader.onload = function() {
			const photo = {
				fileName: file['value'].replace(/.*[\/\\]/, ''),
				base64: reader.result,
				type: reader.result.split(';')[0].split(':')[1],
				format: reader.result.split(';')[0].split(':')[1].split('/')[1]
			};

			app.apiCall('patch', '/user', { _id: userLogged._id, photo: photo }, false)
				.then(function(res) {
					app.toogleLoader();

					const img = $('#photo-img'),
						photoContainer = $('#photo-container');

					if (photoContainer.hasClass('hide')) {
						photoContainer.removeClass('hide');
					}

					img.attr('src', '/api/img/' + res.photo);
				});
		};
	};

	$(document).ready(function() {
		$('.label i').on('click', editValue);
		$('.value').on('blur', removeContentEditable);
		$(photoInputId).on('change', onChangePhotoInput);
	});
})($);