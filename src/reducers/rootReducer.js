import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import getQuestions from './getQuestions';
import timeReducer from './timeReducer';
import categoryReducer from './categoryReducer';
import difficultyReducer from './difficultyReducer';
import typeReducer from './typeReducer';

const rootReducer = () => combineReducers({
  gameReducer,
  getQuestions,
  timeReducer,
  categoryReducer,
  difficultyReducer,
  typeReducer,
});

export default rootReducer;
