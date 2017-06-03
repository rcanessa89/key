import actions from './actions';
import companyService from './company.service';

const getCompanySetAction = payload => ({
	type: actions.setLogged,
	payload: companyService.mapCompanyData(payload),
});

const filterByDepartment = payload => ({
	type: actions.filterByDepartment,
	payload,
});

const searchDepartment = payload => ({
	type: actions.searchDepartment,
	payload,
});

const searchHost = payload => ({
	type: actions.searchHost,
	payload,
});

const resetFilterDepartment = () => ({
	type: actions.resetFilterDepartment,
});

// Async action creators

// Department
const createDepartment = newDepartmentData => dispatch => {
	companyService.saveDepartment(newDepartmentData)
		.then(company => dispatch(getCompanySetAction(company)));
};

const editDepartment = departmentData => dispatch => {
	companyService.editDepartment(departmentData)
		.then(company => dispatch(getCompanySetAction(company)));
};

const deleteDepartment = departmentId => dispatch => {
	companyService.deleteDepartment(departmentId)
		.then(company => dispatch(getCompanySetAction(company)));
}

// Host
const createHost = newHostData => dispatch => {
	companyService.saveHost(newHostData)
		.then(company => dispatch(getCompanySetAction(company)));
};

const editHost = hostData => dispatch => {
	companyService.editHost(hostData)
		.then(company => dispatch(getCompanySetAction(company)));
};

const deleteHost = (departmentId, hostId) => dispatch => {
	companyService.deleteHost(departmentId, hostId)
		.then(company => dispatch(getCompanySetAction(company)));
}

export {
	getCompanySetAction,
	filterByDepartment,
	searchDepartment,
	resetFilterDepartment,
	createDepartment,
	editDepartment,
	deleteDepartment,
	createHost,
	editHost,
	deleteHost,
	searchHost,
};
