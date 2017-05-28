import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import capitalizeFirst from '../../../util/capitalize-first';
import AppButton from '../../../components/app-button/AppButton.component';
import ButtonMenu from '../../../components/button-menu/ButtonMenu.component';
import Modal from '../../../components/modal/Modal.component';
import AppForm from '../../../components/app-form/AppForm.component';
import TextInput from '../../../components/app-form/TextInput.component';
import ModalControl from '../../../services/ModalControl';

const propTypes = {
	allDepartments: PropTypes.arrayOf(PropTypes.shape({
		created_at: React.PropTypes.string,
		hosts: React.PropTypes.array,
		name: React.PropTypes.string,
		updated_at: React.PropTypes.string,
		_id: React.PropTypes.string,
	})),
	department: PropTypes.shape({
		created_at: React.PropTypes.string,
		hosts: React.PropTypes.array,
		name: React.PropTypes.string,
		updated_at: React.PropTypes.string,
		_id: React.PropTypes.string,
	}),
};

const stateMap = state => ({
	allDepartments: state.company.departments,
	department: state.departmentFilter.department,
});

const HostList = props => {
	const modalId = 'modalNewHost'
	const modalControl = new ModalControl(modalId);
	const formId = 'hostForm';

	return (
		<div className="host-list">
			<h3 className="title is-3">{capitalizeFirst(props.department.name)}</h3>
			<ButtonMenu />
			<Modal
				type="card"
				modalId={modalId}
				title="Host form"
				modalButton={
					<AppButton
						text="Create a new host"
						state="primary"/>
				}
			>
				<AppForm
					formId={formId}
					onSubmit={values => {  modalControl.close() }}
					onCancel={modalControl.close}
					selfDEstroy
				>
					<TextInput
						formId={formId}
						fieldId="newHostNameInput"
						name="name"
						label="Name"
						placeholer="Host name..."
						columns="6"
						columnsTablet="12"
						columnsMobile="12"
						required
					/>
					<TextInput
						formId={formId}
						fieldId="newHostLastNameInput"
						name="last_name"
						label="Last name"
						placeholer="Host last name..."
						columns="6"
						columnsTablet="12"
						columnsMobile="12"
						required
					/>
				</AppForm>
			</Modal>
		</div>
	);
};

HostList.propTypes = propTypes;

export default connect(stateMap)(HostList);
