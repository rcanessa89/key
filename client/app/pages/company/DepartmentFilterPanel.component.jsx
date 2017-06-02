import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterByDepartment, searchDepartment } from './action-creators';
import AppButton from '../../components/app-button/AppButton.component';
import Modal from '../../components/modal/Modal.component';
import AppForm from '../../components/app-form/AppForm.component';
import TextInput from '../../components/app-form/TextInput.component';
import ModalControl from '../../services/ModalControl';
import capitalizeFirst from '../../util/capitalize-first';
import sortArrayAlpha from '../../util/sort-array-alpha';
import companyService from './company.service';

const propTypes = {
// 	departments: PropTypes.object.isRequired,
// 	filter: PropTypes.shape({
// 		department: PropTypes.shape({
// 			created_at: PropTypes.string,
// 			hosts: PropTypes.array,
// 			name: PropTypes.string,
// 			updated_at: PropTypes.string,
// 			_id: PropTypes.string,
// 		}),
// 		search: PropTypes.string.isRequired
// 	}),
};

const stateMap = state => ({
	departments: state.companyPage.company.departments,
	filter: state.companyPage.filter,
});

const dispatchMap = dispatch => bindActionCreators({ filterByDepartment, searchDepartment }, dispatch);

class DepartmentFilterPanel extends React.PureComponent {
	componentWillMount() {
		this.props.filterByDepartment({ name: 'All', hosts: companyService.getAllHost(this.props.departments) });
	}

	componentWillUnmount() {
		this.props.reset();
	}

	getBlocks() {
		let panelBlock = [];

		for (const key in this.props.departments) {
			const department = this.props.departments[key];

			const blockClassName = classnames({
				'panel-block': true,
				'is-active': department.name === this.props.filter.department.name,
			});

			if (department.name.indexOf(this.props.filter.search) > -1) {
				const block = (
					<a
						key={department._id}
						className={blockClassName}
						onClick={this.props.filterByDepartment.bind(null, department)}
					>
						{capitalizeFirst(department.name)}
					</a>
				);

				panelBlock.push({
					name: department.name,
					block,
				});
			}
		}

		return panelBlock;
	}

	render() {
		const modalId = 'modalNewDepartment'
		const modalControl = new ModalControl(modalId);
		const formId = 'departmentForm';
		const panelBlocks = sortArrayAlpha(this.getBlocks(), 'name');

		return (
			<nav className="panel">
				<p className="panel-heading">Departments</p>
				<div className="panel-block">
					<p className="control has-icon has-icons-left">
						<input
							className="input is-small"
							type="text"
							placeholder="Search a department"
							onChange={e => this.props.searchDepartment(e.target.value)}
						/>
						<span className="icon is-small is-left"><i className="fa fa-search" /></span>
					</p>
				</div>
				<a className={this.props.filter.department.name === 'All' ? 'panel-block is-active' : 'panel-block'}
					onClick={this.props.filterByDepartment.bind(null, { name: 'All', hosts: companyService.getAllHost(this.props.departments) })}
				>
					All
				</a>
				{
					panelBlocks.map(block => block.block)
				}
				<div className="panel-block">
					<Modal
						type="card"
						modalId={modalId}
						title="Department form"
						modalButton={
							<AppButton
								text="Create a new department"
								state="primary"
								fullWidth />
						}
					>
						<AppForm
							formId={formId}
							onSubmit={values => { this.props.createDepartment(values); modalControl.close() }}
							onCancel={modalControl.close}
						>
							<TextInput
								formId={formId}
								fieldId="newDepartmentNameInput"
								name="name"
								label="Name"
								placeholer="Department name..."
								columns="8"
								columnsTablet="12"
								columnsMobile="12"
								required
							/>
						</AppForm>
					</Modal>
				</div>
			</nav>
		);
	}
}

DepartmentFilterPanel.propTypes = propTypes;

export default connect(stateMap, dispatchMap)(DepartmentFilterPanel);
