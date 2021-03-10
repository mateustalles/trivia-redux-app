import React from 'react';
import { createStore } from 'redux';
import { MemoryRouter, Router } from 'react-router-dom';
import {
  render,
  cleanup,
  wait,
  fireEvent,
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import Questions from '../components/Questions';
import gameReducer from '../reducers/gameReducer';
import Answers from '../components/Answers';
import rootReducer from '../reducers/rootReducer';
import answersAction from '../actions/answersAction';

const initialState = {
  getQuestions: {
    results: [],
  },
  gameReducer: {
    name: 'name',
    gravatarEmail: 'email',
    scoreboard: 0,
    lastQuestionStatus: 'correct',
    answersClasses: [],
  },
  timeReducer: { timer: 0 },
};

function renderWithRedux(
  ui,
  { store = createStore(gameReducer, initialState) } = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}
afterEach(cleanup);

describe('Testing for Questions page', () => {
  it('Time should show and when time gets to 0, wrong message should appear', async () => {
    const { store, getByText } = renderWithRedux(
      <MemoryRouter>
        <Questions />
      </MemoryRouter>,
    );
    await wait(() => expect(store.getState().timeReducer.timer).toBe(0));
    expect(getByText('RESPOSTA ERRADA')).toBeInTheDocument();
  });
});

const reducers = {
  getQuestions: {
    results: [
      {
        category: 'Entertainment%3A%20Music',
        type: 'multiple',
        difficulty: 'medium',
        question: 'Which%20of%20these%20is%20NOT%20a%20song%20on%20The%20Beatles%27%201968%20self%20titled%20album%2C%20also%20known%20as%20the%20White%20album%3F',
        correct_answer: 'Being%20For%20The%20Benefit%20Of%20Mr.%20Kite%21',
        incorrect_answers: [
          'Why%20Don%27t%20We%20Do%20It%20in%20the%20Road%3F',
          'Everybody%27s%20Got%20Something%20to%20Hide%20Except%20Me%20and%20My%20Monkey',
          'The%20Continuing%20Story%20of%20Bungalow%20Bill',
        ],
      }],
  },
  gameReducer: {
    name: 'name',
    gravatarEmail: 'email',
    timer: 6,
    scoreboard: 0,
    lastQuestionStatus: 'correct',
    answersClasses: [],
    question: {
      category: 'Entertainment%3A%20Music',
      type: 'multiple',
      difficulty: 'medium',
      question: 'Which%20of%20these%20is%20NOT%20a%20song%20on%20The%20Beatles%27%201968%20self%20titled%20album%2C%20also%20known%20as%20the%20White%20album%3F',
      correct_answer: 'Being%20For%20The%20Benefit%20Of%20Mr.%20Kite%21',
      incorrect_answers: [
        'Why%20Don%27t%20We%20Do%20It%20in%20the%20Road%3F',
        'Everybody%27s%20Got%20Something%20to%20Hide%20Except%20Me%20and%20My%20Monkey',
        'The%20Continuing%20Story%20of%20Bungalow%20Bill',
      ],
    },
  },
  timeReducer: { timer: 30, stopTimer: false },
  categoryReducer: { categorySelected: '' },
  difficultyReducer: { difficultySelected: '' },
  typeReducer: { typeSelected: '' },
};

function renderWithRedux2(
  ui,
  { store = createStore(rootReducer(), reducers) } = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

describe('test correct render elements', () => {
  it('render with question', () => {
    const history = createMemoryHistory();
    history.push('/game');
    const { getByTestId } = renderWithRedux2(
      <Router history={history}>
        <Questions />
      </Router>,
    );
    expect(getByTestId('question-category')).toBeInTheDocument();
    expect(getByTestId('question-text')).toBeInTheDocument();
    expect(getByTestId('timer')).toBeInTheDocument();
  });
  it('render with question medium', () => {
    const history = createMemoryHistory();
    const { getByTestId, getAllByTestId, store } = renderWithRedux2(
      <Router history={history}>
        <Answers />
        <Questions />
      </Router>,
    );
    store.dispatch(answersAction(reducers.getQuestions.results[0]));
    expect(getByTestId('correct-answer')).toBeInTheDocument();
    expect(getAllByTestId(/wrong-answer/).length).toBe(3);
    getAllByTestId(/wrong-answer/).forEach((ele) => {
      expect(ele).toBeInTheDocument();
    });
    fireEvent.click(getByTestId('correct-answer'));
    expect(getByTestId('btn-next')).toBeInTheDocument();
  });
});
