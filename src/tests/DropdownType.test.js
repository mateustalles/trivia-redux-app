import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DropdownType from '../components/DropdownType';
import typeReducer from '../reducers/typeReducer';
import rootReducer from '../reducers/rootReducer';

afterEach(cleanup);

const type = {
  typeReducer: {
    types: ['multiple', 'boolean'],
    typeSelected: '',
  },
};
function renderWithRedux(
  ui,
  {
    store = createStore(rootReducer(), { ...type }),
  } = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}
function renderWithRedux2(
  ui,
  {
    store = createStore(typeReducer, {
      typeReducer: {
        types: ['multiple', 'boolean'],
        typeSelected: 'boolean',
      },
    }),
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
        <DropdownType />
      </MemoryRouter>,
    );
    expect(getByTestId('question-type-dropdown')).toBeInTheDocument();
    expect(getByTestId('question-type-dropdown').value).toBe('');
  });
  it('test value', () => {
    const { getByTestId } = renderWithRedux2(
      <MemoryRouter>
        <DropdownType />
      </MemoryRouter>,
    );
    expect(getByTestId('question-type-dropdown')).toBeInTheDocument();
    expect(getByTestId('question-type-dropdown').value).toBe('boolean');
  });
  it('test value change', async () => {
    const { queryByTestId, store } = renderWithRedux(
      <MemoryRouter>
        <DropdownType />
      </MemoryRouter>,
    );
    const select = queryByTestId('question-type-dropdown');
    expect(select.tagName).toBe('SELECT');
    fireEvent.change(select, { target: { value: 'boolean' } });
    expect(select.value).toBe('boolean');
  });
});
