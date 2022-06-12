import { User } from "@Entity/User";
import { Either, Left, Right } from "@Util/FunctionalErrorHandler";
import { IUserRepository } from "./interface";

export class InMemoryUserRepository implements IUserRepository{
    private users: User[] = [];

    async findByEmail(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }

    async create(user: User): Promise<Either<Error, User>> {
        const userExists = await this.findByEmail(user.email);
        if (userExists) {
            return new Left(new Error("User already exists"));
        }
        this.users.push(user);
        return new Right(user);
    }
}