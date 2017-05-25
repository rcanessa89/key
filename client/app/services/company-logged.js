const setCompanyLoggedAction = 'SET_COMPANY_LOGGED';

const getCompanyLoggedAction = payload => ({
    type: setCompanyLoggedAction,
    payload
});

const companyLoggedReducer = (state = null, action) => {
    switch (action.type) {
        case setCompanyLoggedAction:
            return action.payload;

        default:
            return state;
    }
};

export { setCompanyLoggedAction, getCompanyLoggedAction, companyLoggedReducer };