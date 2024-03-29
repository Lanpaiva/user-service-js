const ROUTER_MOCK = { get: jest.fn() };

import { UserController } from './user-controller';

jest.mock('express', () => ({
  ...jest.requireActual('express'),
  Router: () => ROUTER_MOCK
}));

describe('UserController tests', () => {
  test('should set routes properly', () => {
    new UserController();

    expect(ROUTER_MOCK.get).toHaveBeenCalledTimes(1);
    expect(ROUTER_MOCK.get).toHaveBeenCalledWith('/', expect.any(Function));
  });
});
