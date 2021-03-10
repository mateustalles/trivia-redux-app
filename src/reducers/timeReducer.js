import {
  RESET_TIMER,
  STOP_TIMER,
  DECREASE_TIMER,
  STORE_TIME_ID,
} from '../actions/TimerActions';

const INITIAL_STATE = {
  timer: 30,
  stopTimer: false,
};

export default function timeReducer(state = INITIAL_STATE, {
  type, timeId,
}) {
  switch (type) {
    case DECREASE_TIMER:
      if (state.timer !== 0 && state.stopTimer === false) {
        return {
          ...state, timer: state.timer - 1,
        };
      } return { ...state };
    case RESET_TIMER:
      return { ...state, stopTimer: false, timer: 30 };
    case STOP_TIMER:
      return { ...state, stopTimer: true, timer: 30 };
    case STORE_TIME_ID:
      return { ...state, timeId };
    default:
      return state;
  }
}
