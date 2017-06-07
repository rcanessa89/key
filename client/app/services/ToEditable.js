export default class ToEditable {
    constructor(editButtonPrefix, editablePrefix, onBlur) {
        this.editableValue = '';
        this.editButtonPrefix = editButtonPrefix;
        this.editablePrefix = editablePrefix;
        this.toEditableEl = this.toEditableEl.bind(this);
        this.onBlur = onBlur;
    }

    toEditableEl(event) {
        const editButtonId = e.target.id;
        const fieldName = editButtonId.replace(this.editButtonPrefix, '');
        const editableElId = `${this.editablePrefix}${fieldName}`;
        const editableEl = document.getElementById(editableElId);

        this.editableValue  = editableEl.innerHTML;

        editableEl.setAttribute('contenteditable', 'true');
        editableEl.focus();
    }
};
