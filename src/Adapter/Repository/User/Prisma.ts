import { Either, Left, Right } from '@Util/FunctionalErrorHandler';
import { User } from 'Entity/User';
import { IUserRepository, prisma } from '..';

export class PrismaUserRepository implements IUserRepository {
  async create(user: User): Promise<Either<Error, User>> {
    try {
      const newUser = await prisma.user.create({
        data: {
          ...user,
          cookies: {
            create: []
          }
        },
        include: {
          cookies: true
        }
      });

      return new Right(newUser);
    } catch (error: any) {
      console.log(error);

      return new Left(error);
    } finally {
      prisma.$disconnect();
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email
        },
        include: {
          cookies: true
        }
      });

      if (user) {
        return user;
      }

      return;
    } catch (error: any) {
      return;
    } finally {
      prisma.$disconnect();
    }
  }

  async findById(id: string): Promise<Either<Error, User>> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id
        },
        include: {
          cookies: true
        }
      });

      if (!user) return new Left(new Error('User not found'));

      return new Right(user);
    } catch (error: any) {
      return new Left(error);
    } finally {
      prisma.$disconnect();
    }
  }

  async update(user: User): Promise<Either<Error, User>> {
    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          ...user,
          cookies: {
            createMany: {
              data: user.cookies
            }
          }
        },
        include: {
          cookies: true
        }
      });

      return new Right(updatedUser);
    } catch (error: any) {
      return new Left(error);
    } finally {
      prisma.$disconnect();
    }
  }
}
