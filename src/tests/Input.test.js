import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Input from '../components/Input';
import rootReducer from '../reducers/rootReducer';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);
const obj = { getQuestions: { error: '' }, gameReducer: { name: '', gravatarEmail: '' } };
function renderWithRedux(
  ui,
  { store = createStore(rootReducer(), obj) } = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

describe('Test input', () => {
  it('Test input and label mail', () => {
    const { queryByTestId } = renderWithRedux(
      <MemoryRouter>
        <Input />
      </MemoryRouter>,
    );
    const inputMail = queryByTestId('input-gravatar-email');
    const labelMail = queryByTestId('label-gravatar-email');
    expect(inputMail).toBeInTheDocument();
    expect(inputMail.value).toBe('');
    expect(labelMail).toBeInTheDocument();
    expect(labelMail.tagName).toBe('LABEL');
    expect(labelMail.innerHTML).toBe('Email do gravatar:');
  });

  it('Test input and label name', () => {
    const { queryByTestId } = renderWithRedux(
      <MemoryRouter>
        <Input />
      </MemoryRouter>,
    );
    const inputName = queryByTestId('input-player-name');
    const labelName = queryByTestId('label-player-name');
    expect(inputName).toBeInTheDocument();
    expect(inputName.value).toBe('');
    expect(labelName).toBeInTheDocument();
    expect(labelName.tagName).toBe('LABEL');
    expect(labelName.innerHTML).toBe('Nome do Jogador:');
  });

  it('test the onChange function in email input', () => {
    const setup = () => {
      const utils = renderWithRedux(
        <MemoryRouter>
          <Input />
        </MemoryRouter>,
      );
      const input = utils.queryByTestId('input-gravatar-email');
      return {
        input,
        ...utils,
      };
    };
    const { input } = setup();
    fireEvent.change(input, { target: { value: 'maria@gmail.com' } });
    expect(input.value).toBe('maria@gmail.com');
  });

  it('test the onChange function in email input', () => {
    const setup = () => {
      const utils = renderWithRedux(
        <MemoryRouter>
          <Input />
        </MemoryRouter>,
      );
      const input = utils.queryByTestId('input-player-name');
      return {
        input,
        ...utils,
      };
    };
    const { input } = setup();
    fireEvent.change(input, { target: { value: 'Maria' } });
    expect(input.value).toBe('Maria');
  });
});
