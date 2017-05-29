import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import capitalizeFirst from '../../../util/capitalize-first';
import AppButton from '../../../components/app-button/AppButton.component';
import ButtonMenu from '../../../components/button-menu/ButtonMenu.component';
import Modal from '../../../components/modal/Modal.component';
import AppForm from '../../../components/app-form/AppForm.component';
import TextInput from '../../../components/app-form/TextInput.component';
import ModalControl from '../../../services/ModalControl';
import * as companyAction from '../action-creators';

const propTypes = {
	allDepartments: PropTypes.array.isRequired,
	department: PropTypes.shape({
		created_at: React.PropTypes.string,
		hosts: React.PropTypes.array,
		name: React.PropTypes.string,
		updated_at: React.PropTypes.string,
		_id: React.PropTypes.string,
	}),
	hosts: PropTypes.array,
};

const stateMap = state => {
	let currentHosts;

	if (state.company.departments[state.departmentFilter.department._id] !== undefined) {
		currentHosts = state.company.departments[state.departmentFilter.department._id].hosts;
	} else {
		currentHosts =  state.departmentFilter.department.hosts;
	}

	return {
		allDepartments: state.company.departments,
		department: state.departmentFilter.department,
		hosts: currentHosts,
	}
}

const dispatchMap = dispatch => bindActionCreators(companyAction, dispatch);

const HostList = props => {
	const modalId = 'modalNewHost'
	const modalControl = new ModalControl(modalId);
	const formId = 'hostForm';
	const departmentNameId = 'departmentName';
	
	let editableValue;

	const editDepartment = () => {
		if (props.department.name !== 'All') {
			const departmentName = document.getElementById(departmentNameId);

			editableValue = departmentName.innerHTML;

			departmentName.setAttribute('contenteditable', 'true');
			departmentName.focus();
		}
	};

	const onEditBlur = e => {
		if (e.target.innerHTML === '') {
			e.target.innerHTML = editableValue;
		} else {
			editableValue = e.target.innerHTML;
		}

		const departmentName = document.getElementById(departmentNameId);

		departmentName.setAttribute('contenteditable', 'false');

		props.editDepartment({
			departmentId: props.department._id,
			name: editableValue,
		});
	}

	const deleteDepartment = () => {
		props.deleteDepartment(props.department._id);
	};

	const departmentMenuItems = [
		{
			text: 'Edit',
			action: editDepartment,
		},

		{
			text: 'Delete',
			action: deleteDepartment,
		},
	];

	const onSubmitCreateHost = values => {
		const data = { ...values, departmentId: props.department._id };
		
		props.createHost(data);

		modalControl.close();
	};

	const departmentTitle = props.department.name !== 'All' ? (
		<div className="department-title-container">
			<h3
				id={departmentNameId}
				onBlur={onEditBlur}
				className="title is-3"
			>
				{capitalizeFirst(props.department.name)}
			</h3>
			<ButtonMenu
				side="left"
				items={departmentMenuItems}
			/>
		</div>
	) : (
		<h3 className="title is-3">{capitalizeFirst(props.department.name)}</h3>
	);

	const createHostModal = props.department.name !== 'All' ? (
		<Modal
			type="card"
			modalId={modalId}
			title="Host form"
			modalButton={
				<AppButton
					text="Create a new host"
					state="primary"
					fullWidth
				/>
			}
		>
			<AppForm
				formId={formId}
				onSubmit={onSubmitCreateHost}
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
	) : null;

	return (
		<div className="host-list">
			{createHostModal}
			{departmentTitle}
			<div className="hosts-container">
				{
					props.hosts.map(host => <div>{host.name}</div>)
				}
			</div>
		</div>
	);
};

HostList.propTypes = propTypes;

export default connect(stateMap, dispatchMap)(HostList);
