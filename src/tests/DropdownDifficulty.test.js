import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DropdownDifficulty from '../components/DropdownDifficulty';
import rootReducer from '../reducers/rootReducer';

afterEach(cleanup);

const testState = {
  difficultyReducer: {
    difficulty: ['easy', 'medium', 'hard'],
    difficultySelected: '',
  },
};

function renderWithRedux(
  ui,
  {
    initialState, store = createStore(rootReducer(), initialState),
  } = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

describe('test dropdown', () => {
  it('test render dropdown', () => {
    const { getByTestId } = renderWithRedux(
      <MemoryRouter>
        <DropdownDifficulty />
      </MemoryRouter>, {
        initialState: {
          ...testState,
          difficultyReducer: {
            difficulty: ['easy', 'medium', 'hard'],
            difficultySelected: '',
          },
        },
      },
    );
    expect(getByTestId('question-difficulty-dropdown')).toBeInTheDocument();
    expect(getByTestId('question-difficulty-dropdown').value).toBe('');
  });
  it('test value', () => {
    const { getByTestId } = renderWithRedux(
      <MemoryRouter>
        <DropdownDifficulty />
      </MemoryRouter>, {
        initialState: {
          ...testState,
          difficultyReducer: {
            difficulty: ['easy', 'medium', 'hard'],
            difficultySelected: 'medium',
          },
        },
      },
    );
    expect(getByTestId('question-difficulty-dropdown')).toBeInTheDocument();
    expect(getByTestId('question-difficulty-dropdown').value).toBe('medium');
  });

  it('test value change', () => {
    const aux = {
      difficultyReducer: {
        difficulty: ['easy', 'medium', 'hard'],
        difficultySelected: 'medium',
      },
    };
    const { queryByTestId } = renderWithRedux(
      <MemoryRouter>
        <DropdownDifficulty />
      </MemoryRouter>,
    );
    const select = queryByTestId('question-difficulty-dropdown');
    expect(select.tagName).toBe('SELECT');
    fireEvent.change(select, { target: { value: 'hard' } });
    expect(select.value).toBe('hard');
  });
});
