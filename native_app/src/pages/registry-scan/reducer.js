const REGISTRY_ACTION_TYPES = {
  NAVIGATE: Symbol(),
};

const REGISTRY_ACTIONS = {
  NAVIGATE: (location) => { return { type: REGISTRY_ACTION_TYPES.NAVIGATE, payload : { location, } } },
};

function RegistryReducer (state = 0, action) {
  switch (action.type) {
    case REGISTRY_ACTION_TYPES.NAVIGATE:
      return state + 1
    default:
      return state
  }

}

module.exports = {
  REGISTRY_ACTIONS,
  RegistryReducer,
};