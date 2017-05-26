import React from 'react';
import { connect } from 'react-redux';
import SectionHeader from '../../components/section-header/SectionHeader.component';
import Title from '../../components/title/Title.component';
import DepartmentsTable from './DepartmentsTable.component';
import HostsTable from './HostsTable.component';

const stateMap = state => ({
	company: state.company,
});

const CompanyPage = props => {
	return (
		<div className="company-page">
			<SectionHeader
				title={props.company.name}
				subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
				line
			/>
			<div className="columns is-multiline">
				<div className="column is-half">
					<div className="table-title">
						<Title
							text="Departments"
							size="4"
						/>
						<button>Create</button>
					</div>
					<DepartmentsTable departments={props.company.departments} />
				</div>
				<div className="column is-half">
					<div className="table-title">
						<Title
							text="Hosts"
							size="4"
						/>
						<button>Create</button>
					</div>
					<HostsTable hosts={props.company.hosts} />
				</div>
			</div>
		</div>
	);
};

export default connect(stateMap)(CompanyPage);
