import actions from './actions';
import companyService from './company.service';

const getCompanyLoggedAction = payload => ({
	type: actions.setLogged,
	payload: companyService.mapCompanyData(payload),
});

// Async

// Department
const createDepartment = newDepartmentData => dispatch => {
	companyService.saveDepartment(newDepartmentData)
		.then(company => dispatch(getCompanyLoggedAction(company)));
};

const editDepartment = departmentData => dispatch => {
	companyService.editDepartment(departmentData)
		.then(company => dispatch(getCompanyLoggedAction(company)));
};

const deleteDepartment = departmentId => dispatch => {
	companyService.deleteDepartment(departmentId)
		.then(company => dispatch(getCompanyLoggedAction(company)));
}

// Host
const createHost = newHostData => dispatch => {
	companyService.saveHost(newHostData)
		.then(company => dispatch(getCompanyLoggedAction(company)));
};

const editHost = hostData => dispatch => {
	companyService.editHost(hostData)
		.then(company => dispatch(getCompanyLoggedAction(company)));
};

const deleteHost = (departmentId, hostId) => dispatch => {
	companyService.deleteHost(departmentId, hostId)
		.then(company => dispatch(getCompanyLoggedAction(company)));
}

export {
	getCompanyLoggedAction,
	createDepartment,
	editDepartment,
	deleteDepartment,
	createHost,
	editHost,
	deleteHost,
};
