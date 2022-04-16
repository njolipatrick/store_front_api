import request from 'supertest';
import app from '../../../app';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMSwiZmlyc3RuYW1lIjoiSm9obiIsImxhc3RuYW1lIjoiRG9lIiwiZW1haWwiOiJqb2hka2xwQGdtYWlsLmNvIiwicm9sZSI6ImFkbWluIiwicGFzc3dvcmQiOiIkMmIkMTAkMy4yT1R6amVZQTJ2OXEzL1laekxrT2F4WWJRWTdpbGxmQjdzUEZQUE1PQm81SU9PQUk1cnkiLCJjcmVhdGVkX2F0IjoiMjAyMi0wNC0xNVQxNzo0ODo0OS42MzJaIiwidXBkYXRlZF9hdCI6IjIwMjItMDQtMTVUMTc6NDg6NDkuNjMyWiJ9LCJpYXQiOjE2NTAwNTIzMjMsImV4cCI6MTY1MDY1NzEyM30.OP6pQFZXGNos5Fm8sP94PP9JLlVkzajvUuNRcuAvjFY";
describe('Test Get All Users', () => {
    let originalTimeout: number;

    beforeAll(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    it('Request /api/v1/user/ should return status 200', async () => {
        const result = await request(app)
            .get('/api/v1/user/')
            .send({ "token": token });
        expect(result.status).toBe(200);
    });

    it('Request /api/v1/user/ should return status 200', async () => {
        const result = await request(app)
            .get('/api/v1/user/')
            .send({ "token": token });
        expect(result.status).toBe(200);
    });
    it('Request /api/v1/user/ should return status 403', async () => {
        const result = await request(app)
            .get('/api/v1/user/');
        expect(result.status).toBe(403);
    });
    it('Request /api/v1/user/:id should return status 200', async () => {
        const result = await request(app)
            .get('/api/v1/user/')
            .send({ "token": token });
        expect(result.body.statusCode).toBe(200);
        expect(result.body.response).toBeInstanceOf(Array);
        expect(result.body.response.length).toBeGreaterThan(0);

    });
});

fdescribe('Test Create User', () => {
    let originalTimeout: number;

    beforeAll(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    it(':: POST ::> Request /api/v1/user/register should return status 200', async () => {
        const result = await request(app)
            .post('/api/v1/user/register')
            .send({ firstName: "JOB", lastName: "ROW", email: "thil@gmai.com", password: 'password', role: 'admin' });
        expect(result.body.statusCode).toBe(201);
        expect(result.body.response).toBeInstanceOf(Array);
      
    });
})

describe('Not found routes', () => {
    it('Request * should return status 404', async () => {
        const result = await request(app).get('/');
        expect(result.status).toBe(404);
      
        
    });
});