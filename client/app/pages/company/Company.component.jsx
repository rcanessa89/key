import React from 'react';
import { connect } from 'react-redux';
import SectionHeader from '../../components/section-header/SectionHeader.component';
import Title from '../../components/title/Title.component';
import Modal from '../../components/modal/Modal.component';
import AppButton from '../../components/app-button/AppButton.component';
import AppForm from '../../components/app-form/AppForm.component';
import TextInput from '../../components/app-form/TextInput.component';
import DepartmentFilterPanel from './department-filter-panel/DepartmentFilterPanel.component';


const stateMap = state => ({
	company: state.company,
});

const CompanyPage = props => {
	return (
		<div className="company-page">
			<SectionHeader
				title={props.company.name}
				subtitle="Departments and hosts"
				line
			/>
			<div className="columns is-multiline">
				<div className="column is-4">
					<DepartmentFilterPanel />
				</div>
				<div className="column is-8">
				
				</div>
			</div>
		</div>
	);
};

export default connect(stateMap)(CompanyPage);
