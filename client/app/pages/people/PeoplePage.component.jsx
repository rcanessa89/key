import React from 'react';
import SectionHeader from '../../components/section-header/SectionHeader.component';
import PeoplePanel from './PeoplePanel.component';
import PeopleList from './PeopleList.component';

const PeoplePage = () => (
	<div className="people-page">
		<SectionHeader
			title="People"
			subtitle="Create, edit or delete the people registries"
			line
		/>
		<div className="columns is-multiline">
			<div className="column is-4">
				<PeoplePanel />
			</div>
			<div className="column is-8">
				<PeopleList />
			</div>
		</div>
	</div>
);

export default PeoplePage;
