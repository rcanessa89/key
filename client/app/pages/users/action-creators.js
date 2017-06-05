import actions from './actions';

const setUsers = payload => ({
    type: actions.set,
    payload,
});

export {
    setUsers,
};
