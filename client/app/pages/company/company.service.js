import store from '../../store.app';
import Api from '../../services/Api';
import mapArray from '../../util/map-array';
import { filterByDepartment } from './action-creators';

const api = new Api();

const saveDepartment = data => api.call('post', 'company/department', data);
const editDepartment = data => api.call('patch', 'company/department', data);
const deleteDepartment = departmentId => api.call('delete', `company/department/${departmentId}`);
const saveHost = data => api.call('post', 'company/host', data);
const editHost = data => api.call('patch', 'company/host', data);
const deleteHost = (departmentId, hostId) => api.call('delete', `company/host/${departmentId}/${hostId}`);

const mapCompanyData = (company) => {
	const companyData = {
		...company,
		departments: mapArray(company.departments, '_id'),
	};

	return companyData;
};

const getAllHost = (departments = store.getState().companyPage.company.departments) => {
	let hosts = [];

	Object.keys(departments).forEach((key) => {
		if (Object.prototype.hasOwnProperty.call(departments, key)) {
			const department = departments[key];

			hosts = [...hosts, ...department.hosts];
		}
	});

	return hosts;
};

const setFilterAll = () => {
	store.dispatch(filterByDepartment({ name: 'All', hosts: getAllHost() }));
};

export default {
	saveDepartment,
	editDepartment,
	deleteDepartment,
	saveHost,
	editHost,
	deleteHost,
	mapCompanyData,
	getAllHost,
	setFilterAll,
};
