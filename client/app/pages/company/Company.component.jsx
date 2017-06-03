import React from 'react';
import SectionHeader from '../../components/section-header/SectionHeader.component';
import DepartmentFilterPanel from './DepartmentFilterPanel.component';
import HostList from './HostList.component';

const CompanyPage = props => {
	const company = props.resolves.data;

	return (
		<div className="company-page">
			<SectionHeader
				title={company.name}
				subtitle="Departments and hosts"
				line
			/>
			<div className="columns is-multiline">
				<div className="column is-4">
					<DepartmentFilterPanel />
				</div>
				<div className="column is-8">
					<HostList />
				</div>
			</div>
		</div>
	);
};

export default CompanyPage;
