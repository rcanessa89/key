import React from 'react';
import Title from '../../components/title/Title.component';

import PersonCard from '../../components/person-card/PersonCard.component';

export default () => (
	<div className="users-page">
		<Title 
			text="Users"
			subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
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
