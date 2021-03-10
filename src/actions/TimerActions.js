export const RESET_TIMER = 'RESET_TIMER';
export const DECREASE_TIMER = 'DECREASE_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const STORE_TIME_ID = 'STORE_TIME_ID';

export const resetTimer = () => ({ type: RESET_TIMER });
export const decreaseTimer = () => ({ type: DECREASE_TIMER });
export const stopTimer = () => ({ type: STOP_TIMER });
export const storeTimeID = (timeId) => ({ type: STORE_TIME_ID, timeId });
