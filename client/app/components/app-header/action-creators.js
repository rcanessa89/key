import actions from './actions';

const setTitle = title => ({
	type: actions.setTitle,
	payload: title,
});

export default setTitle;
