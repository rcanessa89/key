(function($) {
	var errorContainerId = '#error-container',
		buttonSaveId = '#save-edit-user';

	var editValue = function() {
		if (!this.id) {
			return;
		}
		
		var editableId = this.id.replace(/edit-/g, 'value-'),
			valueEditableEl = $('#' + editableId);

		valueEditableEl.attr('contenteditable', 'true');
		valueEditableEl.focus();
	};

	var removeContentEditable = function() {
		$(this).attr('contenteditable', 'false');

		if (!this.id) {
			return;
		}

		var field = this.id.replace(/value-/g, '').toLowerCase(),
			value = this.innerHTML;

		app.user
			.then(function(userLogged) {
				var promise = null,
					payload = {};

				if (field === 'company') {
					field = 'name';

					payload['_id'] = userLogged.company._id;
					payload[field] = this.innerHTML;
					
					promise = app.apiCall('patch', '/company', payload);
				} else {
					promise = app.apiCall('patch', '/user', { _id: userLogged._id, [field]: this.innerHTML });
				}

				return promise;
			}.bind(this))
			.then(function(res) {
				console.log(res);
			});
	};

	$(document).ready(function() {
		$('.label i').on('click', editValue);
		$('.value').on('blur', removeContentEditable);
	});
})($);