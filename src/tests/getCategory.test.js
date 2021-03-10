import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import getCategory from '../services/getCategory';

afterEach(cleanup);

describe('testing getCategory API', () => {
  it('Test return of getCategory', async () => {
    const { trivia_categories: results } = await getCategory();
    const object = {
      id: expect.any(Number),
      name: expect.any(String),
    };
    results.forEach((objeto) => {
      expect(objeto).toMatchObject(object);
    });
  });
});
