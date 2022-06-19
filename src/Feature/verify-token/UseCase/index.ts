import { IUserRepository } from '@Adapter/Repository';
import { Either, Left, Right } from '@Util/FunctionalErrorHandler';
import { User } from 'Entity/User';

export type VerifyTokenRequest = {
  user: User;
};

export class VerifyToken {
  constructor(private userRepo: IUserRepository) {}

  async execute({ user }: VerifyTokenRequest): Promise<Either<void, void>> {
    const userOrError = await this.userRepo.findById(user.id);

    if (userOrError.isLeft()) {
      return new Left(undefined);
    }

    return new Right(undefined);
  }
}
