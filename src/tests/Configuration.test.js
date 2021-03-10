import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from '../App';
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
    typeSelected: '',
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
describe('Test line 9 Configuration', () => {
  it('test configuration', () => {
    const history = createMemoryHistory();
    const { getByText, getByTestId } = renderWithRedux(
      <Router history={history}>
        <App />
      </Router>,
    );
    fireEvent.click(getByTestId('config-button'));
    expect(getByText('Voltar')).toBeInTheDocument();
    fireEvent.click(getByText('Voltar'));
    expect(history.location.pathname).toBe('/');
  });
});
