import supertest from 'supertest';
import { server } from '@Application/Server';

describe('Verify Token', () => {
  let token: string;

  beforeAll(async () => {
    const response = await supertest(server).post('/api/register').send({
      name: 'test',
      email: 'test@test.com',
      password: 'test12341234'
    });

    token = response.body.token;
  });

  afterAll(() => {
    server.close();
  });

  it('should be a valid token', async () => {
    const response = await supertest(server)
      .get('/api/verify-token')
      .set('Authorization', token)
      .send();

    expect(response.body.isValid).toBe(true);
  });
});
