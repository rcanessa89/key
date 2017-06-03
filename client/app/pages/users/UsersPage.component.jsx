import React from 'react';
import SectionHeader from '../../components/section-header/SectionHeader.component';
import PersonCard from '../../components/person-card/PersonCard.component';

const UsersPage = () => (
	<div className="users-page">
		<SectionHeader
			title="Users"
			subtitle="Create, edit or delete an user"
			line
		/>
		<div className="columns is-multiline">
			<PersonCard
				photo="http://bulma.io/images/placeholders/1280x960.png"
				name="Popin"
				lastName="Canessa"
				label="Account Admin"
			/>
			<PersonCard
				photo="http://bulma.io/images/placeholders/1280x960.png"
				name="Popin"
				lastName="Canessa"
				label="Account Admin"
			/>
			<PersonCard
				photo="http://bulma.io/images/placeholders/1280x960.png"
				name="Popin"
				lastName="Canessa"
				label="Account Admin"
			/>
			<PersonCard
				photo="http://bulma.io/images/placeholders/1280x960.png"
				name="Popin"
				lastName="Canessa"
				label="Account Admin"
			/>
		</div>
	</div>
);

export default UsersPage;
