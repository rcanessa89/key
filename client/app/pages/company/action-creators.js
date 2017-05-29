import actions from './actions';
import companyService from './company.service';

const getCompanyLoggedAction = payload => ({
	type: actions.setLogged,
	payload,
});

// Async

// Department
const createDepartment = newDepartmentData => dispatch => {
	companyService.saveDepartment(newDepartmentData)
		.then(company => dispatch(getCompanyLoggedAction(companyService.mapCompanyData(company))));
};

const editDepartment = departmentData => dispatch => {
	companyService.editDepartment(departmentData)
		.then(company => dispatch(getCompanyLoggedAction(companyService.mapCompanyData(company))));
};

const deleteDepartment = departmentId => dispatch => {
	companyService.deleteDepartment(departmentId)
		.then(company => dispatch(getCompanyLoggedAction(companyService.mapCompanyData(company))));
}

// Host
const createHost = newHostData => dispatch => {
	companyService.saveHost(newHostData)
		.then(company => dispatch(getCompanyLoggedAction(company)));
};

export { 
	getCompanyLoggedAction,
	createDepartment,
	editDepartment,
	deleteDepartment,
	createHost,	
};
