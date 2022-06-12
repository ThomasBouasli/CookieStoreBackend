import { Either } from '@Util/FunctionalErrorHandler';
import { Cookie } from 'Entity/Cookie';

export interface ICookieRepository {
  create(cookie: Cookie): Promise<Either<Error, Cookie>>;
}
