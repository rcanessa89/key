import Api from '../../services/Api';
import mapArray from '../../util/map-array';

const api = new Api();

const saveDepartment = data => api.call('post', 'company/department', data);
const editDepartment = data => api.call('patch', 'company/department', data);
const deleteDepartment = departmentId => api.call('delete', `company/department/${departmentId}`);
const saveHost = data => api.call('post', 'company/host', data);
const editeHost = data => api.call('patch', 'company/host', data);

const mapCompanyData = company => {
	const companyData = {
		...company,
		departments: mapArray(company.departments, '_id')
	};

	return companyData;
};

export default {
	saveDepartment,
	editDepartment,
	deleteDepartment,
	saveHost,
	editeHost,
	mapCompanyData,
};
