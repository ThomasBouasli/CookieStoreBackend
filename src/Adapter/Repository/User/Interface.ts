import { User } from '@Entity/User';
import { Either } from '@Util/FunctionalErrorHandler';

export interface IUserRepository {
  findById(id: string): Promise<Either<Error, User>>;
  findByEmail(email: string): Promise<User | undefined>;
  create(user: User): Promise<Either<Error, User>>;
  update(user: User): Promise<Either<Error, User>>;
}
