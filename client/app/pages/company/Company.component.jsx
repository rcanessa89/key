import React from 'react';
import SectionHeader from '../../components/section-header/SectionHeader.component';
import Title from '../../components/title/Title.component';
import UsersTable from './UsersTable.component';

export default props => {
	const company = props.resolves.data.company;

	console.log(props.resolves.data);

	return (
		<div className="company-page">
			<SectionHeader
				title={company.name}
				subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
				line
			/>
			<Title
				text="Users"
				size="4"
			/>
			<div className="columns is-multiline">
				<div className="column is-12">
					<UsersTable users={company.users} />
				</div>
				<div className="column is-half">
					asd
				</div>
				<div className="column is-half">
					wqe
				</div>
			</div>
		</div>
	);
};
