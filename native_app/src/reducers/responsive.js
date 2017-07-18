import { Dimensions } from 'react-native';
import store from '../store';

const getDimentions = () => {
    const dimensions = Dimensions.get('window');

    return {
        height: dimensions.height,
        width: dimensions.width,
        small: dimensions.width < 768,
        landscape: dimensions.width > dimensions.height
    };
};

const actions = {
    set: 'RESPONSIVE_SET'
};

const setDimentions = () => ({
    type: actions.set,
    payload: getDimentions()
});

const responsiveReducer = (state = getDimentions(), action) => {
    switch(action.type) {
        case actions.set:
            return action.payload;
        default:
            return state;
    }
};

Dimensions.addEventListener('change', () => {
    store.dispatch(setDimentions());
});

export default responsiveReducer;

