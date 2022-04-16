import request from 'supertest';
import app from '../../../app';

describe(':: POST ::>Test Register User', () => {
    let originalTimeout: number;

    beforeAll(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    it(' Request /api/v1/user/register should return status 200', async () => {
        const result = await request(app)
            .post('/api/v1/user/register')
            .send({ firstName: "JOB", lastName: "ROW", email: "thil@gmai.com", password: 'password', role: 'admin' });
        expect(result.body.statusCode).toBe(201);
        expect(result.body.response).toBeInstanceOf(Array);
        expect(result.body.response[0].token).toBeInstanceOf(String);
    });
})
describe(':: POST ::> Test User Login', () => {
    let originalTimeout: number;

    beforeAll(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    it(' Request /api/v1/user/login should return status 200', async () => {
        const result = await request(app)
            .post('/api/v1/user/login')
            .send({ email: "thil@gmai.com", password: 'password' });
        expect(result.body.statusCode).toBe(200);
        expect(result.body.response).toBeInstanceOf(Array);
        expect(result.body.response[0].token).toBeInstanceOf(String);
    });
})


describe(':: GET ::> Test Get All Users', () => {
    let originalTimeout: number;

    beforeAll(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    it('Request /api/v1/user/ should return status 200', async () => {
        const register = await request(app)
            .post('/api/v1/user/register')
            .send({ firstName: "JOB", lastName: "ROW", email: "thij@gmai.com", password: 'password', role: 'admin' });
        const token = register.body.response[0].token;
        const result = await request(app)
            .get('/api/v1/user/')
            .send({ "token": token });
        expect(result.status).toBe(200);
    });

    it('Request /api/v1/user/ should return status 200', async () => {
        const register = await request(app)
            .post('/api/v1/user/register')
            .send({ firstName: "JOB", lastName: "ROW", email: "this@gmai.com", password: 'password', role: 'admin' });
        const token = register.body.response[0].token;
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
        const register = await request(app)
            .post('/api/v1/user/register')
            .send({ firstName: "JOB", lastName: "ROW", email: "thl@gmai.com", password: 'password', role: 'admin' });
        const token = register.body.response[0].token;
        const result = await request(app)
            .get('/api/v1/user/')
            .send({ "token": token });
        expect(result.body.statusCode).toBe(200);
        expect(result.body.response).toBeInstanceOf(Array);
        expect(result.body.response.length).toBeGreaterThan(0);

    });
});



describe(':: DELETE ::> Test User Destroy', () => {
    let originalTimeout: number;

    beforeAll(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    it(' Request /api/v1/user/ should return status 200', async () => {
        const login = await request(app)
            .post('/api/v1/user/login')
            .send({ email: "thil@gmai.com", password: 'password' });
        const token = login.body.response[0].token;
        const delete_user_id: number = login.body.response[1].id;
        const result = await request(app)
            .get(`/api/v1/user/${delete_user_id}`)
            .send({ "token": token });
        expect(result.body.statusCode).toBe(200);
        expect(result.body.response).toBeInstanceOf(Array);
        expect(result.body.response.length).toBeGreaterThan(0);

    });
})



describe('Not found routes', () => {
    it('Request * should return status 404', async () => {
        const result = await request(app).get('/');
        expect(result.status).toBe(404);
    });
});