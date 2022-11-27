import { UserEmailAlreadyExistsException } from "../exceptions/user-email-already-exists-exception";
import { User } from "../interfaces/user";
import { UserRepository } from "../repository/user-repository";


export class UserService {
  private userRepository = new UserRepository();

  public createUser(user: User): number {
   if (this.findByEmail(user.email)) {
    throw new UserEmailAlreadyExistsException(
      "E-mail já existente!"
      )
   }

      return this.userRepository.create(user)
  }
  public findByEmail = (email: string) =>
   this.userRepository.findByEmail(email)
}
