import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SectionHeader from '../../components/section-header/SectionHeader.component';
import PersonCard from '../../components/person-card/PersonCard.component';
import AppButton from '../../components/app-button/AppButton.component';
import getRol from '../../services/getRole';
import guid from '../../util/guid';

const propTypes = {
	users: PropTypes.array.isRequired,
};

const stateMap = (state) => ({
	users: state.usersPage.users,
});

const UsersPage = (props) => {
	const createUser = () => {
		console.log('create user');
	};

	const editUser = user => {
		console.log('edit user', user);
	};

	const deleteUser = user => {
		console.log('delete user', user);
	};

	const cards = props.users.map(user => {
		const buttons = user.rol !== 'super_admin' ? [
			{
				label: 'Edit',
				action: editUser,
			},
			{
				label: 'Delete',
				action: deleteUser,
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
			/>
		);
	});

	return (
		<div className="users-page">
			<SectionHeader
				title="Users"
				subtitle="Create, edit or delete an user"
				line
			/>
			<div>
				<AppButton
					text="Create user"
					state="info"
					action={createUser}
				/>
			</div>
			<div className="columns is-multiline">
				{cards}
			</div>
		</div>
	);
};

UsersPage.propTypes = propTypes;

export default connect(stateMap)(UsersPage);
