import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SectionHeader from '../../components/section-header/SectionHeader.component';
import PersonCard from '../../components/person-card/PersonCard.component';
import AppButton from '../../components/app-button/AppButton.component';
import Modal from '../../components/modal/Modal.component';
import AppForm from '../../components/app-form/AppForm.component';
import TextInput from '../../components/app-form/TextInput.component';
import SelectInput from '../../components/app-form/SelectInput.component';
import ModalEditContent from './ModalEditContent.component';
import ModalControl from '../../services/ModalControl';
import getRol from '../../services/getRole';
import guid from '../../util/guid';
import capitalizeFirst from '../../util/capitalize-first';
import constants from '../../constants.app';
import {
	createUser,
	setUserEdit,
	EditUser,
	deleteUser
} from './action-creators';

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

const dispatchMap = dispatch => ({
	dispatch: bindActionCreators(
		{
			createUser,
			setUserEdit,
			EditUser,
			deleteUser,
		},
		dispatch,
	),
});

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
			value: constants.rols.admin,
		},
		{
			label: 'Viewer',
			value: constants.rols.viewer,
		},
	];

	const onSubmitCreateUser = values => {
		props.dispatch.createUser({ ...values, company: props.company._id });
		modalCreateControl.close();
	};

	const editUser = user => {
		props.dispatch.setUserEdit(user);
		modalEditControl.open();
	};

	const deleteUser = (user, index) => {
		props.dispatch.setUserEdit(user);
		modalDeleteControl.open();
	};

	const cards = props.users.map((user, index) => {
		const buttons = user.rol !== 'super_admin' ? [
			{
				label: 'Edit',
				action: () => editUser({ ...user, index: index }),
			},
			{
				label: 'Delete',
				action: () => deleteUser({ ...user, index: index }),
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

	const editModalContent = props.userEdit ? <ModalEditContent userEdit={props.userEdit} onBlur={props.dispatch.EditUser} /> : null;

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
				onClose={props.resetUserEdit}
			>
				<p>{editModalContent}</p>
			</Modal>
			<Modal
				type="confirm"
				modalId={modalDeleteId}
				confirm={() => props.dispatch.deleteUser(props.userEdit)}
			/>
		</div>
	);
};

UsersPage.propTypes = propTypes;

export default connect(stateMap, dispatchMap)(UsersPage);
