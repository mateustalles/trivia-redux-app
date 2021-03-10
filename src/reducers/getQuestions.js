export const INITIAL_STATE = {
  results: [],
};

const GET_QUESTION = 'GET_QUESTION';

export default function getQuestions(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_QUESTION:
      return { ...state, results: action.results };
    default:
      return state;
  }
}
