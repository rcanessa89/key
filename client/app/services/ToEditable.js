import React from 'react';

export default class ToEditable {
	constructor(options) {
		this.editableValue = '';
		this.editButtonPrefix = options.editButtonPrefix;
		this.editableElPrefix = options.editableElPrefix;
		this.toEditableEl = this.toEditableEl.bind(this);
		this.onBlur = options.onBlur;
	}

	setEdit(component) {
		return React.cloneElement(component, { ...component.props, onClick: this.toEditableEl }, component.props.children);
	}

	toEditableEl(event) {
		const elId = event.target.id;
		const editableEl = this.getEditableEl(elId);
		const fieldName = this.getFieldName(elId);
		const blur = () => {
			if (editableEl.innerHTML === '') {
				editableEl.innerHTML = this.editableValue;
			} else if (editableEl.innerHTML !== this.editableValue) {
				this.onBlur({
					field: fieldName,
					value: editableEl.innerHTML,
				});
			}

			editableEl.setAttribute('contenteditable', 'false');
			editableEl.removeEventListener('blur', blur);
		};

		this.editableValue = editableEl.innerHTML;

		editableEl.addEventListener('blur', blur);
		editableEl.setAttribute('contenteditable', 'true');
		editableEl.focus();
	}

	getEditableEl(id) {
		const fieldName = this.getFieldName(id);
		const editableElId = `${this.editableElPrefix}${fieldName}`;

		return document.getElementById(editableElId);
	}

	getFieldName(id) {
		return id.replace(this.editButtonPrefix, '');
	}
}
