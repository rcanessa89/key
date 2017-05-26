import { getCompanyLoggedAction } from '../pages/company/action-creators';

// Actions type
const setUserLoggedActionType = 'USER_SET_LOGGED';

// Actions creator
const getUserLoggedAction = payload => ({
    type: setUserLoggedActionType,
    payload,
});

// Reducers
const userReducer = (state = null, action) => {
    switch (action.type) {
    case setUserLoggedActionType:
        return action.payload;
    default:
        return state;
    }
};

export {
    setUserLoggedActionType,
    getUserLoggedAction,
    userReducer,
};
