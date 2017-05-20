(function($) {
	var currentValue = null,
		errorContainerId = '#error-container',
		photoInputId = '#photo-input';

	var editValue = function() {
		if (!this.id) {
			return;
		}
		
		var editableId = this.id.replace(/edit-/g, 'value-'),
			valueEditableEl = $('#' + editableId);

		currentValue = {
			key: $('#' + this.id).parent().text(),
			value: valueEditableEl[0].innerHTML
		};

		valueEditableEl.attr('contenteditable', 'true');
		valueEditableEl.focus();
	};

	var validOnBlur = function(value) {
		var validation = {
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

	var removeContentEditable = function() {
		$(this).attr('contenteditable', 'false');

		var field = this.id.replace(/value-/g, '').toLowerCase(),
			value = this.innerHTML,
			validation = validOnBlur(value);

		if (!validation.valid) {
			document.getElementById(this.id).innerHTML = currentValue.value;

			return app.showFormErrors(errorContainerId, [validation.error]);
		} else {
			$(errorContainerId).hide();
		}

		app.user
			.then(function(userLogged) {
				var promise = null,
					payload = {};

				if (field === 'company') {
					field = 'name';

					payload['_id'] = userLogged.company._id;
					payload[field] = value;
					
					promise = app.apiCall('patch', '/company', payload);
				} else {
					promise = app.apiCall('patch', '/user', { _id: userLogged._id, [field]: value });
				}

				return promise;
			})
			.then(function(res) {
				console.log(res);
			});
	};

	var onChangePhotoInput = function() {
		app.toogleLoader();

		var file = document.getElementById('photo-input'),
			reader = new FileReader();

		reader.readAsDataURL(file['files'][0]);

		reader.onload = function() {
			var photo = {
				fileName: file['value'].replace(/.*[\/\\]/, ''),
				base64: reader.result,
				type: reader.result.split(';')[0].split(':')[1],
				format: reader.result.split(';')[0].split(':')[1].split('/')[1]
			};

			app.apiCall('patch', '/user', photo, false)
				.then(function(res) {
					console.log(res);
				});
		};
	};

	$(document).ready(function() {
		$('.label i').on('click', editValue);
		$('.value').on('blur', removeContentEditable);
		$(photoInputId).on('change', onChangePhotoInput);
	});
})($);