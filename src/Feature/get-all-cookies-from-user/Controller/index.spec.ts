import { server } from '@Application/Server';
import supertest from 'supertest';

describe('getAllCookiesFromUser', () => {
  afterAll(() => {
    server.close();
  });

  let token: string;

  beforeAll(async () => {
    const response = await supertest(server).post('/api/register').send({
      name: 'test',
      email: 'test@test.com',
      password: 'test12341234'
    });

    token = response.body.token;

    await supertest(server)
      .post('/api/bake')
      .set('Authorization', token)
      .send();
  });

  it('should return all cookies from user', async () => {
    const response = await supertest(server)
      .get('/api/cookies')
      .set('Authorization', token);

    expect(response.body).toHaveLength(1);
  });
});
