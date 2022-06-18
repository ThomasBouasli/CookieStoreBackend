import { server } from '@Application/Server';
import supertest from 'supertest';

describe('getAllCookiesFromUser', () => {
  let token: string;

  beforeAll(async () => {
    const response = await supertest(server).post('/api/register').send({
      name: 'test',
      email: 'test@test.com',
      password: 'test12341234'
    });

    console.log(response.body);

    token = response.body;

    const res = await supertest(server)
      .post('/api/bake')
      .set('Authorization', `Bearer ${token}`)
      .send();

    console.log(res.body);
  });

  it('should return all cookies from user', async () => {
    const response = await supertest(server)
      .get('/api/cookies')
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toHaveLength(1);
  });
});
