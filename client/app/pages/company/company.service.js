import store from '../../store.app';
import Api from '../../services/Api';
import mapArray from '../../util/map-array';
import { filterByDepartment } from './department-filter-panel/action-creators';

const api = new Api();

const saveDepartment = data => api.call('post', 'company/department', data);
const editDepartment = data => api.call('patch', 'company/department', data);
const deleteDepartment = departmentId => api.call('delete', `company/department/${departmentId}`);
const saveHost = data => api.call('post', 'company/host', data);
const editHost = data => api.call('patch', 'company/host', data);
const deleteHost = (departmentId, hostId) => api.call('delete', `company/host/${departmentId}/${hostId}`);

const mapCompanyData = company => {
	const companyData = {
		...company,
		departments: mapArray(company.departments, '_id')
	};

	return companyData;
};

const getAllHost = departments => {
	if (departments === undefined) {
		departments = store.getState().company.departments;
	}

	let hosts = [];

	for (const key in departments) {
		const department = departments[key];

		hosts = [ ...hosts, ...department.hosts ];
	}

	return hosts;
};

const setFilerAll = () => {
	store.dispatch(filterByDepartment({ name: 'All', hosts: getAllHost() }));
}

export default {
	saveDepartment,
	editDepartment,
	deleteDepartment,
	saveHost,
	editHost,
	deleteHost,
	mapCompanyData,
	getAllHost,
	setFilerAll,
};
