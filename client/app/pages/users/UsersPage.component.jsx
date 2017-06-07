import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './action-creators';
import SectionHeader from '../../components/section-header/SectionHeader.component';
import PersonCard from '../../components/person-card/PersonCard.component';
import AppButton from '../../components/app-button/AppButton.component';
import Modal from '../../components/modal/Modal.component';
import AppForm from '../../components/app-form/AppForm.component';
import TextInput from '../../components/app-form/TextInput.component';
import SelectInput from '../../components/app-form/SelectInput.component';
import ModalControl from '../../services/ModalControl';
import getRol from '../../services/getRole';
import guid from '../../util/guid';
import capitalizeFirst from '../../util/capitalize-first';

const propTypes = {
	company: PropTypes.object.isRequired,
	users: PropTypes.array.isRequired,
	userEdit: PropTypes.object,
};

const stateMap = (state) => ({
	company: state.companyPage.company,
	users: state.usersPage.users,
	userEdit: state.usersPage.userEdit,
});

const dispatchMap = dispatch => bindActionCreators(actionCreators, dispatch);

const UsersPage = (props) => {
	const modalcreateId = 'create-user-form-modal';
	const modalCreateControl = new ModalControl(modalcreateId);
	const modalEditId = 'edit-user-modal';
	const modalEditControl = new ModalControl(modalEditId);
	const modalDeleteId = 'delete-user-modal';
	const modalDeleteControl = new ModalControl(modalDeleteId);
	const formId = 'userForm';

	const selectRolInputOptions = [
		{
			label: 'Admin',
			value: 'admin',
		},
		{
			label: 'Viewer',
			value: 'viewer',
		},
	];

	const onSubmitCreateUser = values => {
		props.createUser({ ...values, company: props.company._id });
		modalCreateControl.close();
	};

	const editUser = user => {
		props.setUserEdit(user);
		modalEditControl.open();

		console.log('edit user', user);
	};

	const deleteUser = (user, index) => {
		props.deleteUser({
			user,
			index,
		});
		
		modalDeleteControl.close();
	};

	const cards = props.users.map((user, index) => {
		const buttons = user.rol !== 'super_admin' ? [
			{
				label: 'Edit',
				action: () => editUser(user),
			},
			{
				label: 'Delete',
				action: () => deleteUser(user, index),
			},
		] : [];
		
		return (
			<PersonCard
				key={`person-card-${guid()}`}
				photo={user.photo}
				name={user.name}
				lastName={user.last_name}
				label={getRol(user.rol)}
				footerItems={buttons}
				columns="3"
				columnsTable="4"
			/>
		);
	});

	const editModalContent = props.userEdit ? (
		<div className="edit-container columns is-multiline">
			<div className="column is-6-desktop is-12-tablet is-12-mobile">
				<div className="field-container">
					<p id="field-name" className="edit-field">{capitalizeFirst(props.userEdit.name)}</p>
					<i className="fa fa-pencil-square-o" id="edit-name" />
				</div>
			</div>
			<div className="column is-6-desktop is-12-tablet is-12-mobile">
				<div className="field-container">
					<p id="field-last_name" className="edit-field">{capitalizeFirst(props.userEdit.last_name)}</p>
					<i className="fa fa-pencil-square-o" id="edit-last_name" />
				</div>
			</div>
			
		</div>
	) : null;

	return (
		<div className="users-page">
			<SectionHeader
				title="Users"
				subtitle="Create, edit or delete an user"
				line
			/>
			<div className="button-container">
				<Modal
					type="card"
					modalId={modalcreateId}
					title="User form"
					modalButton={
						<AppButton
							text="Create user"
							state="primary"
						/>
					}
				>
					<AppForm
						formId={formId}
						onSubmit={onSubmitCreateUser}
						onCancel={modalCreateControl.close}
						selfDEstroy
					>
						<TextInput
							formId={formId}
							fieldId="newUserNameInput"
							name="name"
							label="Name"
							placeholer="User name..."
							columns="6"
							columnsTablet="12"
							columnsMobile="12"
							required
						/>
						<TextInput
							formId={formId}
							fieldId="newUserLastNameInput"
							name="last_name"
							label="Last name"
							placeholer="User last name..."
							columns="6"
							columnsTablet="12"
							columnsMobile="12"
							required
						/>
						<TextInput
							formId={formId}
							fieldId="newUserEmailInput"
							type="email"
							name="email"
							label="Email"
							placeholer="User email..."
							columns="6"
							columnsTablet="12"
							columnsMobile="12"
							required
						/>
						<SelectInput
							formId={formId}
							fieldId="newUserRolInput"
							name="rol"
							label="User rol"
							options={selectRolInputOptions}
							columns="6"
							columnsTablet="12"
							columnsMobile="12"
							required
						/>
					</AppForm>
				</Modal>
			</div>
			<div className="columns is-multiline">
				{cards}
			</div>
			<Modal
				type="card"
				modalId={modalEditId}
				title="Edit User"
			>
				{editModalContent}
			</Modal>
		</div>
	);
};

UsersPage.propTypes = propTypes;

export default connect(stateMap, dispatchMap)(UsersPage);
