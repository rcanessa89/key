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

const removeUser = payload => ({
    type: actions.removeUser,
    payload,
})

const setUserEdit = payload => ({
    type: actions.setEdit,
    payload,
});

const resetUserEdit = () => ({
    type: actions.resetEdit,
});

// Async
const createUser = payload => dispatch => usersService.createUser(payload).then(user => dispatch(setUser(user)));
const deleteUser = payload => dispatch => usersService.deleteUser(payload).then(() => dispatch(removeUser(payload.index)));

export {
    setUsers,
    createUser,
    setUserEdit,
    resetUserEdit,
    deleteUser,
};
