const INITIAL_STATE = {
  difficulty: ['easy', 'medium', 'hard'],
  difficultySelected: '',
};

const CHANGE_DIFFICULTY = 'CHANGE_DIFFICULTY';
const RESET_FILTER = 'RESET_FILTER';

export default function difficultyReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_DIFFICULTY:
      return {
        ...state,
        difficultySelected: action.change,
      };
    case RESET_FILTER:
      return INITIAL_STATE;
    default: return state;
  }
}
