import Api from '../../services/Api';

const api = new Api();

const createUser = userData => api.call('post', '/user', userData);

export default {
    createUser,
};
