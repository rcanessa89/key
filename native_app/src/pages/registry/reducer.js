import actions from './actions';

const initialState = {
    showCamera: false
};

export default (state = initialState, action) => {
    switch(action.type) {
        case actions.showCamera:
            return {
                ...state,
                showCamera: action.payload
            };

        default:
            return state;
    }
};
