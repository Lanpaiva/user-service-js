import { UserEmailAlreadyExistsException } from "../exceptions/user-email-already-exists-exception";
import { User } from "../interfaces/user";
import { UserService } from "./user-service";

class NoErrorException extends Error {}

const errorWrapper = (callback: () => void): Error => {
  try {
    callback()
    throw new NoErrorException()
  } catch(error) {
    return error;
  }
}

const USER_ID_MOCK = 3456346

const USER_MOCK: User = {
  email: "return-mock@awari.com",
  name: "Awari Classs",
  password: "456",
  password_confirmation: "456"
}

const createUserMock = jest.fn(() => USER_ID_MOCK)

jest.mock("../repository/user-repository", () => ({
  UserRepository: jest.fn().mockImplementation(() =>({
    findByEmail: (email: string) =>
    email === "return-mock@awari.com" ? USER_MOCK : undefined,
    create: createUserMock
  }))
}))


describe('User service test', () => {
  test('shou throw UserEmailAlreadyExistsException when user-email already exists!', () => {

    const userService = new UserService();

    //userService.createUser(user)
    const error = errorWrapper(() => userService.createUser(USER_MOCK))

    expect(error).toBeInstanceOf(UserEmailAlreadyExistsException)
    expect(error.message).toBe("E-mail já existente!")
   });

   test('should return user ID when user is created', () => {
    const user: User = {
      ...USER_MOCK,
      email: "awari@awari.com",
    }
    const userService = new UserService();


    const userId = userService.createUser(user)

    expect(createUserMock).toBeCalledWith(user)
    expect(userId).toBe(USER_ID_MOCK)
   })

   test('should return user when email is search by e-mail', () => {
    const userService = new UserService()

     const user = userService.findByEmail(USER_MOCK.email)


    expect(user).toStrictEqual(USER_MOCK)
   })
});
