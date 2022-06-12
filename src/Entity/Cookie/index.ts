import { User } from 'Entity/User';

export type Cookie = {
  name: string;
  owner: Pick<User, 'id' | 'name' | 'email'>;
};
