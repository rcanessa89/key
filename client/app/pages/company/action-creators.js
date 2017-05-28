import actions from './actions';
import companyService from './company.service';

const getCompanyLoggedAction = payload => ({
    type: actions.setLogged,
    payload,
});

// Async
const createHost = newHostData => dispatch => {
	companyService.saveHost(newHostData)
		.then(hostCreated => dispatch(getCreateHostAction(hostCreated)));
};

const createDepartment = newDepartmentData => dispatch => {
	companyService.saveDepartment(newDepartmentData)
		.then(company => dispatch(getCompanyLoggedAction(company)));
};

export { getCompanyLoggedAction, createDepartment };