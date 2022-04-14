import client from "../../config/database";

export type Product = {
  name: string;
  price: string;
  category: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM products";
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error(`could not connect fetch data from the db ${err}`);
    }
  }
  async show(ID: number): Promise<Product[]> {
    try {

      const conn = await client.connect();
      const sql = "SELECT * FROM products WHERE id = $1";
      const values = [ID];
      const res = await conn.query(sql, values);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error(`could not connect fetch data from the db ${err}`);
    }
  }
  async getProductByCategory(category: string): Promise<Product[]> {
    try {

      const conn = await client.connect();
      const sql = "SELECT * FROM products WHERE category = $1";
      const values = [category];
      const res = await conn.query(sql, values);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`could not connect fetch data from the db ${err}`);
    }
  }
  async create(product: Product): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO products (name,  price, category) VALUES ($1, $2, $3) RETURNING *;";
      const values = [product.name, product.price, product.category];
      const res = await conn.query(sql, values);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error(`could not connect fetch data from the db ${err}`);
    }
  }
  async destroy(id: number): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM products WHERE id = $1 RETURNING *;";
      const values = [id];
      const res = await conn.query(sql, values);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error(`could not connect fetch data from the db ${err}`);
    }
  }
}
