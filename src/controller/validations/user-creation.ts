import * as EmailValidator from 'email-validator';
import { InvalidPayloadExpeption } from '../../exceptions/invalid.payload-exception';
import { User } from "../../interfaces/user";

 export interface ErrorResponse {
  status: number;
  message: string;
}

 export const REQUIRED_FIELDS = ['name', 'email', 'password', 'password_confirmation'];

export const validateUserPayload = (user: User) => {

  for (let i = 0; i < REQUIRED_FIELDS.length; i++) {
    if (!user[REQUIRED_FIELDS[i]]?.trim()) {
      throw new InvalidPayloadExpeption (
       `inválido: o campo ${REQUIRED_FIELDS[i]} não pode ser vazio!`
      )
    }
  }

  if (!EmailValidator.validate(user.email)) {
    throw new InvalidPayloadExpeption('inválido: campo email inválido')
  }

  if (user.password !== user.password_confirmation) {
    throw new InvalidPayloadExpeption('inválido: as senhas não coincidem!')
  }
};
