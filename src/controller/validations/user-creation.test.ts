import { InvalidPayloadExpeption } from "../../exceptions/invalid.payload-exception";
import { User } from "../../interfaces/user";
import { REQUIRED_FIELDS, validateUserPayload } from "./user-creation";

class NoErrorException extends Error {}

const errorWrapper = (callback: () => void): Error => {
  try {
    callback()
    throw new NoErrorException()
  } catch(error) {
    return error;
  }
}

describe("Creating user validation test", () => {
  test("should throw InvalidPayloadExpeption when field is required", () => {
    REQUIRED_FIELDS.forEach((field) => {
      [null, undefined, '', ' '].forEach((value) => {
        const user = {
          email: 'ABC@AWARI.COM',
          name: 'Awariclass',
          password: '123',
          password_confirmation: '123',
          [field]: value
        };

        const error = errorWrapper(() => validateUserPayload(user as User));

        expect(error).toBeInstanceOf(InvalidPayloadExpeption);
        expect(error.message).toBe(
          `inválido: o campo ${field} não pode ser vazio!`
        );
      })
    })
  });

  test("should throw InvalidPayloadExpeption if field of email is invalid", () => {

    const invalidEmails = ['abc', '@abc.com' ]
    invalidEmails.forEach((value) => {
      const user: User = {
        email: value,
        name: 'Awari Class',
        password: '123',
        password_confirmation: '123'
      }

      const error = errorWrapper(() => validateUserPayload(user as User));

      expect(error).toBeInstanceOf(InvalidPayloadExpeption)
      expect(error.message).toBe('inválido: campo email inválido')

    })
  })

  test("should throw InvalidPayloadExpeption if fields password" +
        "and password_confirmation isn't strict equals", () => {
    const user: User = {
      email: 'value@value.com',
      name: 'Awari Class',
      password: '123 ',
      password_confirmation: '123'
    }

    const error = errorWrapper(() => validateUserPayload(user as User));

    expect(error).toBeInstanceOf(InvalidPayloadExpeption)
    expect(error.message).toBe('inválido: as senhas não coincidem!')
  })

  test("should throw NoErrorException when user payload is valid!", () => {
    const user: User = {
      email: 'value@value.com',
      name: 'Awari Class',
      password: '123',
      password_confirmation: '123'
    }

    const error = errorWrapper(() => validateUserPayload(user as User));

    expect(error).toBeInstanceOf(NoErrorException)
  })
});
