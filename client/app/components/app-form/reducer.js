import actions from './actions';

export default (state = {}, action) => {
	switch (action.type) {
		case actions.init:
			return { ...state, [action.payload.id]: action.payload };
		case actions.destroy: {
			const newState = { ...state };
			delete newState[action.payload];
			return newState;
		}
		case actions.registryField: {
			let form = { ...state[action.payload.formId] };

			form.fields[action.payload.fieldId] = action.payload;
			
			return { ...state, [action.payload.formId]: form };
		}
		case actions.fieldChange: {
			let form = { ...state[action.payload.formId] };

			form.fields[action.payload.fieldId] = action.payload;
			
			return { ...state, [action.payload.formId]: form };
		}
		default:
			return state;
	}
}