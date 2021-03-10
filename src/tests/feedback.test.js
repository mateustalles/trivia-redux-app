import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Feedback from '../pages/Feedback';
import rootReducer from '../reducers/rootReducer';

afterEach(cleanup);
const reducer = {
  gameReducer: {
    name: 'aaaaa', gravatarEmail: 'aaaaa', scoreboard: 0, answersClasses: ['', '', '', ''],
  },
  categoryReducer: {},
  getQuestions: { results: [] },
  timeReducer: { timer: 2 },
  typeReducer: {
    types: ['multiple', 'boolean'],
    Tselected: '',
  },
  difficultyReducer: {
    difficulty: ['easy', 'medium', 'hard'],
    difficultySelected: '',
  },
};

function renderWithRedux(
  ui,
  { store = createStore(rootReducer(), reducer) } = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

describe('Test feedback', () => {
  it('test feedback elements', () => {
    const obj = { player: { name: 'Josezinho', gravatarEmail: 'aaaa', assertions: 0 } };
    localStorage.setItem('state', JSON.stringify(obj));
    const history = createMemoryHistory();
    history.push('/feedback');
    const { getByText, getByTestId } = renderWithRedux(
      <Router history={history}>
        <Feedback />
      </Router>,
    );
    expect(getByTestId('feedback-text')).toBeInTheDocument();
    expect(getByTestId('feedback-total-question')).toBeInTheDocument();
    expect(getByTestId('feedback-total-score')).toBeInTheDocument();
    expect(getByText('JOGAR NOVAMENTE')).toBeInTheDocument();
    expect(getByTestId('feedback-text').innerHTML).toBe('Podia ser melhor...');
    expect(getByTestId('feedback-total-question').innerHTML).toBe('Você acertou 0 questões!');
  });
  it('values in localStorage', () => {
    localStorage.clear();
    const obj = { player: { name: 'Josezinho', gravatarEmail: 'aaaa', assertions: 4 } };
    localStorage.setItem('state', JSON.stringify(obj));
    const history = createMemoryHistory();
    history.push('/feedback');
    const { getByTestId } = renderWithRedux(
      <Router history={history}>
        <Feedback />
      </Router>,
    );
    expect(getByTestId('feedback-total-question').innerHTML).toBe('Você acertou 4 questões!');
    expect(getByTestId('feedback-text').innerHTML).toBe('Mandou bem!');
  });

  it('void values in localStorage', () => {
    const obj = { player: { name: 'Josezinho', gravatarEmail: 'aaaa', assertions: 0 } };
    localStorage.setItem('state', JSON.stringify(obj));
    const history = createMemoryHistory();
    history.push('/feedback');
    const { getByTestId } = renderWithRedux(
      <Router history={history}>
        <Feedback />
      </Router>,
    );
    expect(getByTestId('feedback-text').innerHTML).toBe('Podia ser melhor...');
    expect(getByTestId('feedback-total-question').innerHTML).toBe('Você acertou 0 questões!');
  });

  it('Redirect to home', () => {
    const obj = { player: { name: 'Josezinho', gravatarEmail: 'aaaa' } };
    localStorage.setItem('state', JSON.stringify(obj));
    const history = createMemoryHistory();
    history.push('/feedback');
    const { getByText } = renderWithRedux(
      <Router history={history}>
        <Feedback />
      </Router>,
    );
    expect(history.location.pathname).toBe('/feedback');
    fireEvent.click(getByText('JOGAR NOVAMENTE'));
    expect(history.location.pathname).toBe('/');
  });
});
