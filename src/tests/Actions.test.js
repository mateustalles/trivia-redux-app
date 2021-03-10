import changeCategory from '../actions/ChangeCategory';
import changeDifficulty from '../actions/ChangeDifficulty';
import ChangeScoreboard from '../actions/ChangeScoreboard';
import ChangeType from '../actions/ChangeType';
import GameActions from '../actions/GameActions';
import { resetAllFilters } from '../actions/noFilter';
import ReceiveError from '../actions/ReceiveError';
import ReceiveQuestion from '../actions/ReceiveQuestion';
import RequestCategory from '../actions/RequestCategory';
import { resetPoints } from '../actions/resetPoints';
import SendEmail from '../actions/SendEmail';
import SendName from '../actions/SendName';
import setPoints from '../actions/setPoints';
import {
  resetTimer, decreaseTimer, stopTimer, storeTimeID,
} from '../actions/TimerActions';
import store from '../store';

describe('test actions', () => {
  it('changeCategory', async () => {
    const aux = changeCategory('aaa');
    expect(aux).toMatchObject({ change: 'aaa', type: 'CHANGE_CATEGORY' });
    store.dispatch(RequestCategory([1, 2, 3]));
    store.dispatch(changeCategory(1));
    expect(store.getState().categoryReducer.category).toMatchObject([1, 2, 3]);
    expect(store.getState().categoryReducer.categorySelected).toBe(undefined);
  });
  it('changeDifficulty', () => {
    const aux = changeDifficulty('aaa');
    expect(aux).toMatchObject({ change: 'aaa', type: 'CHANGE_DIFFICULTY' });
    store.dispatch(changeDifficulty('aaaaaaaa'));
    expect(store.getState().difficultyReducer.difficultySelected).toBe('aaaaaaaa');
  });
  it('ChangeScoreboard', () => {
    const aux = ChangeScoreboard();
    expect(aux).toMatchObject({ type: 'WRONG_ANSWER' });
    store.dispatch(ChangeScoreboard());
    expect(store.getState().gameReducer.wrongAnswerFlag).toBeTruthy();
  });
  it('ChangeType', () => {
    const aux = ChangeType('aaa');
    expect(aux).toMatchObject({ change: 'aaa', type: 'CHANGE_TYPE' });
    store.dispatch(ChangeType('aaaaaa'));
    expect(store.getState().typeReducer.typeSelected).toBe('aaaaaa');
  });
  it('GameActions', () => {
    const aux = GameActions('aaa');
    expect(aux).toMatchObject({ answersClasses: 'aaa', type: 'FORMAT_ANSWERS' });
    store.dispatch(GameActions(['', '']));
    expect(store.getState().gameReducer.answersClasses).toMatchObject(['', '']);
  });
  it('resetAllFilters', () => {
    const aux = resetAllFilters();
    expect(aux).toMatchObject({ type: 'RESET_FILTER' });
  });
  it('ReceiveError', () => {
    const aux = ReceiveError('error');
    expect(aux).toMatchObject({ type: 'ERROR', error: 'error' });
    store.dispatch(ReceiveError('error'));
    expect(store.getState().gameReducer.name).toBe('error');
  });
  it('ReceiveQuestion', () => {
    const aux = ReceiveQuestion([]);
    expect(aux).toMatchObject({ type: 'GET_QUESTION', results: [] });
    store.dispatch(ReceiveQuestion([1, 3, 5]));
    expect(store.getState().getQuestions.results).toMatchObject([1, 3, 5]);
  });
  it('RequestCategory', () => {
    const aux = RequestCategory([]);
    expect(aux).toMatchObject({ type: 'GET_CATEGORY', results: [] });
    store.dispatch(RequestCategory([1, 2]));
    expect(store.getState().categoryReducer).toMatchObject({
      category: [1, 2],
      categorySelected: undefined,
    });
  });
  it('resetPoints', () => {
    const aux = resetPoints();
    expect(aux).toMatchObject({ type: 'RESET_POINTS' });
  });
  it('SendEmail', () => {
    const aux = SendEmail('joaninha@gmail.com');
    expect(aux).toMatchObject({ type: 'SEND_EMAIL', email: 'joaninha@gmail.com' });
  });
  it('SendName', () => {
    const aux = SendName('joaninham');
    expect(aux).toMatchObject({ type: 'SEND_NAME', name: 'joaninham' });
  });
  it('setPoints', () => {
    const aux = setPoints(0);
    expect(aux).toMatchObject({ type: 'SET_POINTS', points: 0 });
    store.dispatch(setPoints(1));
    expect(store.getState().gameReducer.score).toBe(1);
    expect(store.getState().gameReducer.assertions).toBe(1);
  });
  it('resetTimer', () => {
    const aux = resetTimer();
    expect(aux).toMatchObject({ type: 'RESET_TIMER' });
  });
  it('decreaseTimer', () => {
    const aux = decreaseTimer();
    expect(aux).toMatchObject({ type: 'DECREASE_TIMER' });
    store.dispatch(decreaseTimer());
    expect(store.getState().timeReducer.timer).toBe(29);
    store.dispatch(stopTimer());
    store.dispatch(decreaseTimer());
    expect(store.getState().timeReducer.timer).toBe(30);
  });
  it('stopTimer', () => {
    const aux = stopTimer();
    expect(aux).toMatchObject({ type: 'STOP_TIMER' });
  });
  it('storeTimeID', () => {
    const aux = storeTimeID(552);
    expect(aux).toMatchObject({ type: 'STORE_TIME_ID', timeId: 552 });
    store.dispatch(storeTimeID(10));
    expect(store.getState().timeReducer.timeId).toBe(10);
  });
});
