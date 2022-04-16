import request from 'supertest';
import app from '../../../app';

fdescribe('::::>Test Product', async () => {
  let originalTimeout: number;

  beforeAll(async () => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it(' Request /api/v1/product should return all product available', async () => {
    const register = await request(app).post('/api/v1/user/register')
      .send({
        firstName: "John", lastName: "Doe", email: "johnthedoe@gmai.com",
        password: 'password', role: 'admin'
      });

    const token: string = register.body.response[0].token;

    const { body } = await request(app)
      .get('/api/v1/product')
      .send({ token: token });
    expect(register.body.response[0].token).toBeInstanceOf(String);
    expect(body.statusCode).toBe(200);
    expect(body.response).toBeInstanceOf(Array);
  });

  it(' Request /api/v1/product should return product created', async () => {
    const register = await request(app).post('/api/v1/user/register')
      .send({
        firstName: "John", lastName: "Doe", email: "johntdoe@gmai.com",
        password: 'password', role: 'admin'
      });

    const token: string = register.body.response[0].token;


    const { body } = await request(app)
      .post('/api/v1/product')
      .send({ name: "JOB", price: 250, category: "june", token: token });
    expect(body.statusCode).toBe(200);
    expect(body.response).toBeInstanceOf(Array);
    expect(register.body.response[0].token).toBeInstanceOf(String);

  });
});