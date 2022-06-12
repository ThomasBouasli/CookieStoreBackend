import { User } from '@Entity/User';
import { Either } from '@Util/FunctionalErrorHandler';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  create(user: User): Promise<Either<Error, User>>;
}
