// @ts-ignore
import client from '../../config/database';

export type Product = {
    id?: number;
    name: string;
    qantity_available: number;
    price: number;
    image_url: string;
    description: string;
    brand: string;
    owner_id: number;
    discount: number;
};

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM products';
            const res = await conn.query(sql);
            return res.rows;
        } catch (err) {
            throw new Error(`could not connect fetch data from the db ${err}`);
        }
    }
}
