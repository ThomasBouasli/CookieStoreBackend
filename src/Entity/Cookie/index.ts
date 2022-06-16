import { User } from 'Entity/User';

export type Cookie = {
  id: string;
  name: string;
  owner: Omit<User, 'cookies' | 'password'>;
};
