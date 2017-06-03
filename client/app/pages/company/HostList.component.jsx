import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import capitalizeFirst from '../../util/capitalize-first';
import AppButton from '../../components/app-button/AppButton.component';
import ButtonMenu from '../../components/button-menu/ButtonMenu.component';
import Modal from '../../components/modal/Modal.component';
import AppForm from '../../components/app-form/AppForm.component';
import TextInput from '../../components/app-form/TextInput.component';
import ModalControl from '../../services/ModalControl';
import companyService from './company.service';
import sortArrayAlpha from '../../util/sort-array-alpha';
import {
	editDepartment,
	deleteDepartment,
	createHost,
	editHost,
	deleteHost,
	searchHost,
} from './action-creators';

const propTypes = {
	department: PropTypes.shape({
		_id: PropTypes.string,
		name: PropTypes.string.required,
		hosts: PropTypes.array.isRequired,
	}),
};

const stateMap = state => {
	const selectedDepartment = state.companyPage.filter.department;
	const department = selectedDepartment._id ? state.companyPage.company.departments[selectedDepartment._id] : selectedDepartment;
	
	let currentHosts;

	if (department !== undefined) {
		currentHosts = department.hosts;
	} else {
		currentHosts =  state.companyPage.filter.department.hosts;
	}

	return {
		department: { ...department, hosts: sortArrayAlpha(currentHosts, 'name')},
		searchHostValue: state.companyPage.searchHost,
	}
}

const dispatchMap = dispatch => bindActionCreators({
	editDepartment,
	deleteDepartment,
	createHost,
	editHost,
	deleteHost,
	searchHost,
}, dispatch);

const HostList = props => {
	const modalId = 'modalNewHost'
	const modalControl = new ModalControl(modalId);
	const formId = 'hostForm';
	const departmentNameId = 'departmentName';
	
	let editableValue;

	const toContentEditable = elId => {
		if (props.department.name !== 'All') {
			const el = document.getElementById(elId);

			editableValue = el.innerHTML;

			el.setAttribute('contenteditable', 'true');
			el.focus();
		}
	};

	const onEditBlur = (elId, cb, event) => {
		if (event.target.innerHTML === '') {
			event.target.innerHTML = editableValue;
		} else if (event.target.innerHTML !== editableValue) {
			editableValue = event.target.innerHTML;
			cb(editableValue);
		}

		const el = document.getElementById(elId);

		el.setAttribute('contenteditable', 'false');
	}

	const deleteDepartment = () => {
		props.deleteDepartment(props.department._id);
		companyService.setFitlerAll();
	};

	const onSubmitCreateHost = values => {
		const data = { ...values, departmentId: props.department._id };
		
		props.createHost(data);

		modalControl.close();
	};

	const getDepartmentTitle = () => {
		const departmentMenuItems = [
			{
				text: 'Edit',
				action: toContentEditable.bind(null, departmentNameId),
			},

			{
				text: 'Delete',
				action: deleteDepartment,
			},
		];

		const departmentTitle = props.department.name !== 'All' ? (
			<div className="department-title-container">
				<h3
					id={departmentNameId}
					className="title is-3"
					onBlur={onEditBlur.bind(null, departmentNameId, () => {
						props.editDepartment({
							departmentId: props.department._id,
							name: editableValue,
						});
					})}
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

		return departmentTitle;
	};

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

	const searchHostControlClassName = classnames({
		control: true,
		'has-icon': true,
		'has-icons-left' : true,
		'search-host-margin-top': props.department.name !== 'All',
		'search-host' : true,
	});

	return (
		<div className="host-list">
			{createHostModal}
			<p className={searchHostControlClassName}>
				<input
					className="input"
					type="text"
					placeholder="Search a host"
					onChange={e => props.searchHost(e.target.value)}
				/>
				<span className="icon is-small is-left"><i className="fa fa-search" /></span>
			</p>
			{getDepartmentTitle()}
			<div className="hosts-container">
				<table className="table is-striped">
					<thead>
						<tr>
							<th>Name</th>
							<th>Last Name</th>
							<th>{props.department.name !== 'All' ? '' : 'Department'}</th>
						</tr>
					</thead>
					<tbody>
						{
							props.department.hosts.map(host => {
								if (host.name.indexOf(props.searchHostValue) === -1 && host.last_name.indexOf(props.searchHostValue) === -1) {
									return null;
								}

								const nameId = `name-${host._id}`;
								const lastNameId = `last-name-${host._id}`;
								const hostMenuItems = [
									{
										text: 'Edit name',
										action: hostNameId => toContentEditable.bind(null, nameId)(),
									},

									{
										text: 'Edit last name',
										action: hostNameId => toContentEditable.bind(null, lastNameId)(),
									},

									{
										text: 'Delete',
										action: () => props.deleteHost(props.department._id, host._id),
									},
								];

								const menuButton = props.department.name !== 'All' ? (
									<ButtonMenu
										side="left"
										items={hostMenuItems}
									/>
								) : host.departmentName;

								return (
									<tr key={host._id}>
										<td
											id={nameId}
											onBlur={onEditBlur.bind(
												null,
												nameId,
												() => {
													props.editHost({
														departmentId: props.department._id,
														hostId: host._id,
														name: editableValue,
													});
												}
											)}
										>
											{capitalizeFirst(host.name)}
										</td>
										<td
											id={lastNameId}
											onBlur={onEditBlur.bind(
												null,
												lastNameId,
												() => {
													props.editHost({
														departmentId: props.department._id,
														hostId: host._id,
														last_name: editableValue,
													});
												}
											)}
										>
											{capitalizeFirst(host.last_name)}
										</td>
										<td>
											{menuButton}
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</div>
		</div>
	);
};

HostList.propTypes = propTypes;

export default connect(stateMap, dispatchMap)(HostList);
