import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import rootReducer from '../reducers/rootReducer';

afterEach(cleanup);

function renderWithRedux(
  ui,
  {
    store = createStore(
      rootReducer(),
      {
        gameReducer: { name: '', gravatarEmail: '' },
        difficultyReducer: {
          difficulty: ['easy', 'medium', 'hard'],
          difficultySelected: '',
        },
        categoryReducer: { category: [], categorySelected: {} },
        typeReducer: {
          types: ['multiple', 'boolean'],
          typeSelected: '',
        },
        getQuestions: { error: '' },
      },
    ),
  } = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

describe('testing Configuration page', () => {
  it('testing if there is a configuration button with data-testid=`config-button`', () => {
    const { getByTestId } = renderWithRedux(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(getByTestId('config-button')).toBeInTheDocument();
  });

  it('testing if the page is redirect to the path /configuration when click the button', () => {
    const history = createMemoryHistory();
    const { getByTestId } = renderWithRedux(
      <Router history={history}>
        <App />
      </Router>,
    );
    fireEvent.click(getByTestId('config-button'));
    expect(history.location.pathname).toBe('/configuration');
  });
});
