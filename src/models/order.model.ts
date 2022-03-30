// @ts-ignore
import client from '../../config/database';

export type Order = {
    name: string;
    price: string;
    category: string;
};

export class OrderLog {
    async index(): Promise<Order[]> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders';
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        } catch (err) {
            throw new Error(`could not connect fetch data from the db ${err}`);
        }
    };
    async create(order: Order): Promise<Order[]> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = "INSERT INTO orders (name,  price, category) VALUES ($1, $2, $3) RETURNING *;";
            const values = [order.name, order.price, order.category];
            const res = await conn.query(sql, values);
            conn.release();
            return res.rows;
        } catch (err) {
            throw new Error(`could not connect fetch data from the db ${err}`);
        }
    };
    async update(order: Order, id: number): Promise<Order[]> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = "UPDATE orders SET name = $1, price = $2, category = $3 WHERE id=$4 RETURNING *; ";
            const values = [order.name, order.price, order.category, id];
            const res = await conn.query(sql, values);
            conn.release();
            return res.rows;
        } catch (err) {
            throw new Error(`could not connect fetch data from the db ${err}`);
        }
    }
    async destroy(id: number): Promise<Order[]> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'DELETE FROM orders WHERE id = $1 RETURNING *;';
            const values = [id];
            const res = await conn.query(sql, values);
            conn.release();
            return res.rows;
        } catch (err) {
            throw new Error(`could not connect fetch data from the db ${err}`);
        }
    }
}
