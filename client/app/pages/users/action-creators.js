import actions from './actions';
import usersService from './users.service';

const setUsers = payload => ({
	type: actions.set,
	payload,
});

const setUser = payload => ({
	type: actions.setUser,
	payload,
});

const setUserEdited = payload => ({
	type: actions.setUserEdited,
	payload,
});

const removeUser = payload => ({
	type: actions.removeUser,
	payload,
});

const setUserEdit = payload => ({
	type: actions.setEdit,
	payload,
});

const resetUserEdit = () => ({
	type: actions.resetEdit,
});

// Async
const createUser = payload => dispatch => usersService.createUser(payload).then(user => dispatch(setUser(user)));
const EditUser = payload => dispatch => usersService.editUser(payload.data).then(user => dispatch(setUserEdited({ user, index: payload.index })));
const deleteUser = payload => dispatch => usersService.deleteUser(payload._id).then(() => dispatch(removeUser(payload.index)));

export {
	setUsers,
	setUser,
	removeUser,
	setUserEdit,
	resetUserEdit,
	createUser,
	EditUser,
	deleteUser,
};
