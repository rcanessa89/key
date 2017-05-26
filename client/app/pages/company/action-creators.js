import actions from './actions';
import companyService from './company.service';

const getCompanyLoggedAction = payload => ({
    type: actions.setLogged,
    payload,
});

const getCreateHostAction = payload => ({
	type: actions.createHost,
	payload: res,
});

const getCreateDepartmentAction = payload => ({
	type: actions.createDepartment,
	payload: res,
});

// Async
const createHost = newHostData => dispatch => {
	companyService.saveHost(newHostData)
		.then(hostCreated => dispatch(getCreateHostAction(hostCreated)));
};

const createDepartment = newDepartmentData => dispatch => {
	companyService.saveDepartment(newDepartmentData)
		.then(departmentCreated => dispatch(getCreateDepartmentAction(departmentCreated)));
};

export { getCompanyLoggedAction };