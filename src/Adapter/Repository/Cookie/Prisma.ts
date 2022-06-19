import { PrismaClient } from '@prisma/client';
import { Either, Left, Right } from '@Util/FunctionalErrorHandler';
import { Cookie } from 'Entity/Cookie';
import { ICookieRepository } from './Interface';

export class PrismaCookieRepository implements ICookieRepository {
  async create(cookie: Cookie): Promise<Either<Error, Cookie>> {
    const prisma = new PrismaClient();
    try {
      await prisma.cookie.create({
        data: {
          id: cookie.id,
          name: cookie.name,
          ownerId: cookie.owner.id
        }
      });

      return new Right(cookie);
    } catch (error: any) {
      return new Left(error);
    } finally {
      prisma.$disconnect();
    }
  }
}
