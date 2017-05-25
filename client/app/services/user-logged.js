const setUserLoggedAction = 'SET_USER_LOGGED';

const getUserLoggedAction = payload => ({
    type: setUserLoggedAction,
    payload
});

const loggedReducer = (state = null, action) => {
    switch (action.type) {
        case setUserLoggedAction:
            return action.payload;

        default:
            return state;
    }
};

export { setUserLoggedAction, getUserLoggedAction, loggedReducer };
