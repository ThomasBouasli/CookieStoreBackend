import { Cookie } from 'Entity/Cookie';

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  Cookies: Omit<Cookie, 'owner'>[];
};
