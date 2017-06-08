import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterByDepartment, searchDepartment, resetFilterDepartment, createDepartment } from './action-creators';
import AppButton from '../../components/app-button/AppButton.component';
import Modal from '../../components/modal/Modal.component';
import AppForm from '../../components/app-form/AppForm.component';
import TextInput from '../../components/app-form/TextInput.component';
import ModalControl from '../../services/ModalControl';
import capitalizeFirst from '../../util/capitalize-first';
import sortArrayAlpha from '../../util/sort-array-alpha';
import companyService from './company.service';

const propTypes = {
	departments: PropTypes.object,
	filter: PropTypes.shape({
		department: PropTypes.shape({
			_id: PropTypes.string,
			name: PropTypes.string.required,
			hosts: PropTypes.array.isRequired,
		}),
		search: PropTypes.string,
	}),
	dispatch: PropTypes.shape({
		filterByDepartment: PropTypes.func.isRequired,
		resetFilterDepartment: PropTypes.func.isRequired,
		searchDepartment: PropTypes.func.isRequired,
		createDepartment: PropTypes.func.isRequired,
	}).isRequired,
};

const defaultProps = {
	departments: {},
	filter: {
		department: { name: 'All', hosts: [] },
		search: '',
	},
};

const stateMap = state => ({
	departments: state.companyPage.company.departments,
	filter: state.companyPage.filter,
});

const dispatchMap = dispatch => ({
	dispatch: bindActionCreators({
		filterByDepartment,
		searchDepartment,
		resetFilterDepartment,
		createDepartment,
	}, dispatch),
});

class DepartmentFilterPanel extends React.PureComponent {
	componentWillMount() {
		this.props.dispatch.filterByDepartment({ name: 'All', hosts: companyService.getAllHost(this.props.departments) });
	}

	componentWillUnmount() {
		this.props.dispatch.resetFilterDepartment();
	}

	getBlocks() {
		const panelBlock = [];

		Object.keys(this.props.departments).forEach((key) => {
			if (Object.prototype.hasOwnProperty.call(this.props.departments, key)) {
				const department = this.props.departments[key];

				const blockFilterByDepartment = () => {
					this.props.dispatch.filterByDepartment(department);
				};

				const blockClassName = classnames({
					'panel-block': true,
					'is-active': department.name === this.props.filter.department.name,
				});

				if (department.name.indexOf(this.props.filter.search) > -1) {
					const block = (
						<a
							key={department._id}
							className={blockClassName}
							onClick={blockFilterByDepartment}
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
		});

		return panelBlock;
	}

	render() {
		const modalId = 'modalNewDepartment';
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
							onChange={e => this.props.dispatch.searchDepartment(e.target.value)}
						/>
						<span className="icon is-small is-left"><i className="fa fa-search" /></span>
					</p>
				</div>
				<a
					className={this.props.filter.department.name === 'All' ? 'panel-block is-active' : 'panel-block'}
					onClick={() => this.props.dispatch.filterByDepartment({ name: 'All', hosts: companyService.getAllHost(this.props.departments) })}
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
								fullWidth
							/>
						}
					>
						<AppForm
							formId={formId}
							onSubmit={(values) => { this.props.dispatch.createDepartment(values); modalControl.close(); }}
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
DepartmentFilterPanel.defaultProps = defaultProps;

export default connect(stateMap, dispatchMap)(DepartmentFilterPanel);
