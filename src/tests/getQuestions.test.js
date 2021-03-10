import { cleanup } from '@testing-library/react';
import getQuestionsApi from '../services/getQuestionsApi';
import tokenRequest from '../services/tokenRequest';

afterEach(cleanup);

describe('testing getQuestions API', () => {
  it('questions are retrieved from API when theres a token', async () => {
    const data = await tokenRequest();
    const token = (typeof data === 'object') ? data.token : data;
    localStorage.setItem('token', token);
    const categorySelected = { id: '' };
    const difficultySelected = '';
    const typeSelected = '';
    const props = {
      categorySelected, difficultySelected, typeSelected,
    };
    const { response_code: responseCode, results } = await getQuestionsApi(props);
    const resultModel = [{
      category: expect.any(String),
      type: expect.any(String),
      difficulty: expect.any(String),
      question: expect.any(String),
      correct_answer: expect.any(String),
      incorrect_answers: [
        expect.any(String),
        expect.any(String),
        expect.any(String),
      ],
    }];
    expect(responseCode).toBe(0);
    expect(results).toEqual(expect.arrayContaining(resultModel));
  });

  it('response 3 and empty array is retrieved when no token is provided', async () => {
    const categorySelected = { id: '' };
    const difficultySelected = '';
    const typeSelected = '';
    const token = 'asdqadqw';
    localStorage.setItem('token', token);
    const props = {
      categorySelected, difficultySelected, typeSelected,
    };
    const { response_code: responseCode, results } = await getQuestionsApi(props);
    expect(responseCode).toBe(3);
    expect(results).toMatchObject([]);
  });
  it('response 3 and empty array is retrieved when no token is provided', async () => {
    const token = 'asdqadqw';
    localStorage.setItem('token', token);
    const { response_code: responseCode, results } = await getQuestionsApi();
    expect(responseCode).toBe(2);
    expect(results).not.toBeNull();
  });
});
