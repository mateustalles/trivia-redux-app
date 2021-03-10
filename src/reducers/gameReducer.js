import { FORMAT_ANSWERS } from '../actions/GameActions';
import { RESET_POINTS } from '../actions/resetPoints';

export const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: 0,
  assertions: 0,
  wrongAnswerFlag: false,
  answersClasses: [],
  question: {},
};
const QUESTION = 'QUESTION';
const SENDEMAIL = 'SEND_EMAIL';
const SENDNAME = 'SEND_NAME';
const WRONG_ASNWER = 'WRONG_ANSWER';
const SET_POINTS = 'SET_POINTS';
const ERROR = 'ERROR';

export default function gameReducer(state = INITIAL_STATE, {
  type, email, name, answersClasses, points, error, question,
}) {
  switch (type) {
    case SENDEMAIL:
      return { ...state, gravatarEmail: email };
    case SENDNAME:
      return { ...state, name };
    case WRONG_ASNWER:
      return { ...state, wrongAnswerFlag: true };
    case FORMAT_ANSWERS:
      return { ...state, answersClasses };
    case SET_POINTS:
      return {
        ...state, score: state.score + points, assertions: state.assertions + 1,
      };
    case ERROR:
      return { ...state, name: error, gravatarEmail: '' };
    case RESET_POINTS:
      return INITIAL_STATE;
    case QUESTION:
      return { ...state, question };
    default:
      return state;
  }
}
