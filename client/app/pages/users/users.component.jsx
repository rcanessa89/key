import React from 'react';
import PersonCard from '../../components/person-card/PersonCard.component';

export default () => (
	<div className="users-page">
		<h1>Users Page</h1>
		<div className="columns is-multiline">
			<PersonCard
				photo="http://bulma.io/images/placeholders/1280x960.png"
				name="Popin"
				lastName="Canessa"
				label="Account Admin"
				footerItems={[
					{
						label: 'alert 1',
						action: () => alert('Alert 1'),
					},

					{
						label: 'alert 2',
						action: () => alert('Alert 2'),
					},

					{
						label: 'alert 3',
						action: () => alert('Alert 3'),
					},
				]}
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
			<PersonCard
				photo="http://bulma.io/images/placeholders/1280x960.png"
				name="Popin"
				lastName="Canessa"
				label="Account Admin"
			/>
		</div>
	</div>
);
