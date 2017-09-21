const ACTION_TYPES = {
  NAVIGATE: Symbol(),
};

const ACTIONS = {
  NAVIGATE: (location) => { return { type: ACTION_TYPES.NAVIGATE, payload : { location, } } },
};

function ConfirmReducer (state = 0, action) {
  switch (action.type) {
    case ACTION_TYPES.NAVIGATE:
      return state + 1
    default:
      return state
  }

}

module.exports = {
  ACTIONS,
  ConfirmReducer,
};