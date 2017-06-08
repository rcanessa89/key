import Api from '../../services/Api';

const api = new Api();

const createUser = userData => api.call('post', '/user', userData);
const editUser = userData => api.call('patch', '/user', userData);
const deleteUser = id => api.call('delete', `/user/id/${id}`);

export default {
	createUser,
	editUser,
	deleteUser,
};
