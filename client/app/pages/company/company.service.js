import Api from '../../services/Api';

const api = new Api();

const createNewHost = data => api.call('post', 'host');
const createDepartment = data => api.call('post', 'department');

export default {
	createNewHost,
	createDepartment
};