import { User } from 'Entity/User';

export type Cookie = {
  id: string;
  name: string;
  owner: Pick<User, 'id' | 'name' | 'email'>;
};
