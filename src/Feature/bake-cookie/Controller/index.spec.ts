import { server } from '@Application/Server';
import supertest from 'supertest';

describe('Bake Cookie Controller', () => {
  let token: string;

  beforeAll(async () => {
    const response = await supertest(server).post('/api/register').send({
      name: 'test',
      email: 'test@test.com',
      password: 'testmesmo'
    });

    token = response.body;
  });

  afterAll(() => {
    server.close();
  });

  it('should return a cookie', async () => {
    const response = await supertest(server)
      .post('/api/bake')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });
});
