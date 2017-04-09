import actions from './actions';

const init = form => ({
	type: actions.init,
	payload: form,
});

const destroy = id => ({
	type: actions.destroy,
	payload: id,
});

const registryField = field => ({
	type: actions.registryField,
	payload: field,
});

const onChangeField = field => ({
	type: actions.fieldChange,
	payload: field,
});

const evalForm = form => ({
	type: actions.evalForm,
	payload: form,
});

export { init, destroy, registryField, onChangeField, evalForm };
