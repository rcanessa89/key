import Api from '../../services/Api';

const api = new Api();
const saveDepartment = data => api.call('post', 'company/department', data);
const saveHost = data => api.call('post', 'company/add-host');

export default {
	saveHost,
	saveDepartment
};