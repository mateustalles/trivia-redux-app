import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent, waitForDomChange } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DropdownCategory from '../components/DropdownCategory';
import rootReducer from '../reducers/rootReducer';

afterEach(cleanup);

function renderWithRedux(
  ui,
  {
    store = createStore(rootReducer(), {
      categoryReducer: {
        category: [{ id: 9, name: 'General' }],
        categorySelected: { id: '', name: '' },
      },
    }),
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
    store = createStore(rootReducer(), {
      categoryReducer: {
        category: [{ id: 9, name: 'blabla' }],
        categorySelected: { id: 9, name: 'aaaa' },
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
        <DropdownCategory />
      </MemoryRouter>,
    );
    expect(getByTestId('question-category-dropdown')).toBeInTheDocument();
    expect(getByTestId('question-category-dropdown').value).toBe('');
  });
  it('test value', () => {
    const { getByTestId } = renderWithRedux2(
      <MemoryRouter>
        <DropdownCategory />
      </MemoryRouter>,
    );
    expect(getByTestId('question-category-dropdown')).toBeInTheDocument();
    expect(getByTestId('question-category-dropdown').value).toBe('9');
  });
  it('test value change', () => {
    const { queryByTestId } = renderWithRedux2(
      <MemoryRouter>
        <DropdownCategory />
      </MemoryRouter>,
    );

    const select = queryByTestId('question-category-dropdown');
    expect(select.tagName).toBe('SELECT');
    fireEvent.change(select, { target: { value: '9' } });
    expect(select.value).toBe('9');
  });
  it('mock test', async () => {
    const { getByText, store } = renderWithRedux(
      <MemoryRouter>
        <DropdownCategory />
      </MemoryRouter>,
    );

    await waitForDomChange();
    expect(getByText(/General/)).toBeInTheDocument();

  });
});
