const JSON_MOCK = { limit: '50mb' };
const URLENCODED_MOCK = { limit: '50mb', extended: true };
const CORS_RETURN_MOCK = 'cors return';

const expressMock = { use: jest.fn() };
const bodyParserMock = {
  json: jest.fn(() => JSON_MOCK),
  urlencoded: jest.fn(() => URLENCODED_MOCK)
};
const corsMock = jest.fn(() => CORS_RETURN_MOCK);

import { App } from './app';

jest.mock('express', () => () => expressMock);
jest.mock('body-parser', () => bodyParserMock);
jest.mock('cors', () => corsMock);
jest.mock('./controller/user-controller');

describe('App tests', () => {
  test('should create and call setConfig method properly', () => {
    new App();

    expect(expressMock.use).toBeCalledTimes(4);
    expect(expressMock.use).toHaveBeenNthCalledWith(1, JSON_MOCK);
    expect(expressMock.use).toHaveBeenNthCalledWith(2, URLENCODED_MOCK);
    expect(expressMock.use).toHaveBeenNthCalledWith(3, CORS_RETURN_MOCK);
    expect(bodyParserMock.json).toBeCalledWith(JSON_MOCK);
    expect(bodyParserMock.urlencoded).toBeCalledWith(URLENCODED_MOCK);
  });
});
