
import client from "../../config/database";

export type Order = {
    status: string;
    quantity?: string;
    user_id: number;
};

export class OrderLog {
    async index(): Promise<Order[]> {
        try {
            const conn = await client.connect();
            const sql = "SELECT * FROM orders";
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        } catch (err) {
            throw new Error(`could not connect fetch data from the db ${err}`);
        }
    }
    async show(ID: number): Promise<Order[]> {
        try {
            const conn = await client.connect();
            const sql = "SELECT * FROM orders WHERE id = $1";
            const values = [ID];
            const res = await conn.query(sql, values);
            conn.release();
            return res.rows;
        } catch (err) {
            throw new Error(`could not connect fetch data from the db ${err}`);
        }
    }
    async create({ order, product_id }: { order: Order; product_id: number; }) {
        try {
            const conn = await client.connect();

            const order_sql = "INSERT INTO orders (status,  user_id) VALUES ($1, $2) RETURNING *;";
            const order_values = [order.status, order.user_id];
            const order_response = await conn.query(order_sql, order_values);

            const order_id = Number(order_response.rows[0].id);

            const order_product_sql = "INSERT INTO order_product (quantity,  order_id, product_id) VALUES ($1, $2, $3) RETURNING *;";
            const order_product_values = [order.quantity, order_id, product_id];

            await conn.query(order_product_sql, order_product_values);

            const product = await conn.query("SELECT name FROM products WHERE id = $1", [product_id])
            const product_name = product.rows[0].name;
            conn.release();
            const result = {
                order_id: order_id,
                product: product_name,
                quantity: order.quantity,
                status: order.status
            }
            return result;
        } catch (err) {
            throw new Error(`could not connect fetch data from the db ${err}`);
        }
    }
    async destroy(id: number): Promise<Order[]> {
        try {
            const conn = await client.connect();
            const sql = "DELETE FROM orders WHERE id = $1 RETURNING *;";
            const values = [id];
            const res = await conn.query(sql, values);
            conn.release();
            return res.rows;
        } catch (err) {
            throw new Error(`could not connect fetch data from the db ${err}`);
        }
    }
}
