const INITIAL_STATE = {
  types: ['multiple', 'boolean'],
  typeSelected: '',
};

const RESET_FILTER = 'RESET_FILTER';
const CHANGE_TYPE = 'CHANGE_TYPE';

export default function typeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_TYPE:
      return {
        ...state,
        typeSelected: action.change,
      };
    case RESET_FILTER:
      return INITIAL_STATE;
    default: return state;
  }
}
