import request from 'supertest';
import app from '../../app';

describe('::::>Test Order', async () => {
    let originalTimeout: number;

    beforeAll(async () => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });



    it(' Request /api/v1/order should return the order created', async () => {
        const register = await request(app).post('/api/v1/user/register')
            .send({
                firstName: "John", lastName: "Doe", email: "drive@gmai.com",
                password: 'password', role: 'admin'
            });

        const token: string = register.body.response[0].token;
        const ID = Number(register.body.response[1][0].id);

        await request(app)
            .post('/api/v1/product')
            .send({ name: "Jeep", price: 2500, category: "june", token: token });

        await request(app)
            .post('/api/v1/product')
            .send({ name: "Toyota Corolla", price: 2000, category: "june", token: token });

        await request(app)
            .post('/api/v1/order/1')
            .send({ status: "active", quantity: 2, user_id: ID, token: token });

        const result = await request(app)
            .post('/api/v1/order/1')
            .send({ status: "completed", quantity: 2, user_id: ID, token: token });

        expect(result.body.statusCode).toBe(200);
        expect(result.body.response).toBeInstanceOf(Array);
        expect(register.body.response[0].token).toBeInstanceOf(String);
    });


    it(' Request /api/v1/order should return ALL active orders', async () => {
        const register = await request(app).post('/api/v1/user/register')
            .send({
                firstName: "John", lastName: "Doe", email: "driver3@gmai.com",
                password: 'password', role: 'admin'
            });


        const ID = Number(register.body.response[1][0].id);
        const token: string = register.body.response[0].token;


        await request(app)
            .post('/api/v1/product')
            .send({ name: "Jeep", price: 2500, category: "june", token: token });

        await request(app)
            .post('/api/v1/product')
            .send({ name: "Toyota Corolla", price: 2000, category: "june", token: token });

        await request(app)
            .post('/api/v1/order/1')
            .send({ status: "active", quantity: 2, user_id: ID, token: token });

        await request(app)
            .post('/api/v1/order/1')
            .send({ status: "active", quantity: 2, user_id: ID, token: token });


        const result = await request(app)
            .get('/api/v1/order/user/active')
            .send({ token: token });

        expect(result.body.statusCode).toBe(200);
        expect(result.body.response).toBeInstanceOf(Array);
        expect(result.body.response[0].status).toBe('active');
    });


    it(' Request /api/v1/order should return ALL completed orders', async () => {
        const register = await request(app).post('/api/v1/user/register')
            .send({
                firstName: "John", lastName: "Doe", email: "driver4@gmai.com",
                password: 'password', role: 'admin'
            });

        const ID = Number(register.body.response[1][0].id);
        const token: string = register.body.response[0].token;


        await request(app)
            .post('/api/v1/product')
            .send({ name: "Jeep v1", price: 2500, category: "june", token: token });

        await request(app)
            .post('/api/v1/product')
            .send({ name: "Toyota Corolla Black", price: 2000, category: "june", token: token });

        await request(app)
            .post('/api/v1/order/1')
            .send({ status: "complete", quantity: 2, user_id: ID, token: token });

        await request(app)
            .post('/api/v1/order/1')
            .send({ status: "complete", quantity: 2, user_id: ID, token: token });


        const result = await request(app)
            .get('/api/v1/order/user/complete')
            .send({ token: token });


        expect(result.body.statusCode).toBe(200);
        expect(result.body.response).toBeInstanceOf(Array);
        expect(result.body.response[0].status).toBe('complete');
    });


    it(' Request /api/v1/order should return deleted order by ID', async () => {
        const register = await request(app).post('/api/v1/user/register')
            .send({
                firstName: "John", lastName: "Doe", email: "driver5@gmai.com",
                password: 'password', role: 'admin'
            });

        const token: string = register.body.response[0].token;
        const { body } = await request(app)
            .delete(`/api/v1/order/1`).send({ token: token });
        expect(body.statusCode).toBe(200);
        expect(body.response).toBeInstanceOf(Array);
        expect(register.body.response[0].token).toBeInstanceOf(String);
    });
});