import React from 'react';
import PropTypes from 'prop-types';
import SectionHeader from '../../components/section-header/SectionHeader.component';
import DepartmentFilterPanel from './DepartmentFilterPanel.component';
import HostList from './HostList.component';

const propTypes = {
	resolves: PropTypes.object,
};

const defaultProps = {
	resolves: {},
};

const CompanyPage = (props) => {
	const company = props.resolves.company;

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

CompanyPage.propTypes = propTypes;
CompanyPage.defaultProps = defaultProps;

export default CompanyPage;
