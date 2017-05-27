import actions from './actions';

const setUsers = payload => ({
	type: actions.setUsers,
	payload: payload
});

export { setUsers };
