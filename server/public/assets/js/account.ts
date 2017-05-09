(function($) {
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
	};

	$(document).ready(function() {
		$('.label i').on('click', editValue);
		$('.value').on('blur', removeContentEditable);
	});
})($);