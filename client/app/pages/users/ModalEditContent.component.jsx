import React from 'react';
import ToEditable from '../../services/ToEditable';
import capitalizeFirst from '../../util/capitalize-first';

export default props => {
    const toEditable = new ToEditable({
		editButtonPrefix: 'edit-',
		editableElPrefix: 'field-',
		onBlur: data => {
            props.onBlur({
                data: { 
                    [data.field]: data.value,
                    _id: props.userEdit._id,
                },
                index: props.userEdit.index,
            });
        },
	});

    const onSelectChange = event => {
        props.onBlur({
            data: { 
                rol: event.target.value,
                _id: props.userEdit._id,
            },
            index: props.userEdit.index,
        });
    };
    
    return (
        <div className="edit-container columns is-multiline">
            <div className="column is-6-desktop is-12-tablet is-12-mobile">
                <label className="label">Name</label>
                <div className="field-container">
                    <p id="field-name" className="edit-field">{capitalizeFirst(props.userEdit.name)}</p>
                    {toEditable.setEdit(<i className="fa fa-pencil-square-o" id="edit-name"></i>)}
                </div>
            </div>
            <div className="column is-6-desktop is-12-tablet is-12-mobile">
                <label className="label">Last Name</label>
                <div className="field-container">
                    <p id="field-last_name" className="edit-field">{capitalizeFirst(props.userEdit.last_name)}</p>
                    {toEditable.setEdit(<i className="fa fa-pencil-square-o" id="edit-last_name" />)}
                </div>
            </div>
            <div className="column is-6-desktop is-12-tablet is-12-tablet">
                <div className="field">
                    <label className="label">Rol</label>
                    <p className="control">
                        <span className="select">
                            <select
                                onChange={onSelectChange}
                                defaultValue={props.userEdit.rol}
                            >
                                <option value="admin">Admin</option>
                                <option value="viewer">Viewer</option>
                            </select>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};
