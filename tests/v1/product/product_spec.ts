import request from 'supertest';
import app from '../../../app';

describe('::::>Test Product', async () => {
  let originalTimeout: number;

  beforeAll(async () => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it(' Request /api/v1/product should return ALL product available', async () => {
    const { body } = await request(app)
      .get('/api/v1/product');
    expect(body.statusCode).toBe(200);
    expect(body.response).toBeInstanceOf(Array);
  });

  it(' Request /api/v1/product should return the product created', async () => {
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
  it(' Request /api/v1/product should return product by ID', async () => {
    const { body } = await request(app)
      .get(`/api/v1/product/1`);
    expect(body.statusCode).toBe(200);
    expect(body.response).toBeInstanceOf(Array);
  });

  it(' Request /api/v1/product should return deleted product by ID', async () => {
    const login = await request(app).post('/api/v1/user/login')
      .send({
        email: "johntdoe@gmai.com",
        password: 'password',
      });

    const token: string = login.body.response[0].token;
    const { body } = await request(app)
      .delete(`/api/v1/product/1`).send({ token: token });


    expect(body.statusCode).toBe(200);
    expect(body.response).toBeInstanceOf(Array);

    expect(login.body.response[0].token).toBeInstanceOf(String);
  });
});