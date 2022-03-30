// @ts-ignore
import client from '../../config/database';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
const saltRounds = Number(process.env.SALT_ROUNDS);
const pepper = process.env.BCRYPT_PASSWORD;

export type User = {
    firstName: string;
    lastName: string;
    email: string
    password: string;
};

export class UserStore {
    async index(): Promise<User[]> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM users';
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        } catch (err) {
            throw new Error(`could not connect fetch data from the db ${err}`);
        }
    };
    async register({ user }: { user: User; }): Promise<User[]> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = "INSERT INTO users (firstName, email, lastName, password) VALUES ($1, $2, $3, $4) RETURNING *;";
            const hashPassword = await bcrypt.hash(user.password + pepper, saltRounds);
            user.password = hashPassword;
            const token = sign({ user: user }, String(process.env.TOKEN_SECRET), { expiresIn: 60 * 60 });
            const values = [user.firstName, user.email, user.lastName, user.password];
            const res = await conn.query(sql, values);
            conn.release();
            return [token, res.rows];
        } catch (err) {
            throw new Error(`unable to register user ${err}`);
        }
    };
    async authenticate({ email, password }: { email: string; password: string; }): Promise<User[] | null> {
        try {
            //@ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM users WHERE email =$1';
            const result = await conn.query(sql, [email]);
            if (result.rows.length) {
                const user = result.rows;
                const checkUser = await bcrypt.compare(password + pepper, user[0].password);

                if (!checkUser) {
                    throw new Error(`Invalid login credentials`);
                }
                const token = sign({ user: user }, String(process.env.TOKEN_SECRET), { expiresIn: 60 * 60 });
                return [token, user]
            }
            return null;

        } catch (error) {
            console.log(error)
            throw new Error(`unable to login use ${error}`);
        }
    }
    async update({ user, id }: { user: User; id: number; }): Promise<User[]> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = "UPDATE users SET firstName = $1, email = $2, lastName = $3, password= $4 WHERE id=$5 RETURNING *; ";
            const hashPassword = await bcrypt.hash(user.password + pepper, saltRounds);
            user.password = hashPassword;
            const values = [user.firstName, user.email, user.lastName, user.password, id];
            const res = await conn.query(sql, values);
            conn.release();
            return res.rows;
        } catch (err) {
            throw new Error(`could not connect fetch data from the db ${err}`);
        }
    }
    async destroy({ id }: { id: number; }): Promise<User[]> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'DELETE FROM users WHERE id = $1 RETURNING *;';
            const values = [id];
            const res = await conn.query(sql, values);
            conn.release();
            return res.rows;
        } catch (err) {
            throw new Error(`could not connect fetch data from the db ${err}`);
        }
    }
    async checker(email: string): Promise<Boolean> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT email FROM users WHERE email = $1;';
            const values = [email];
            const res = await conn.query(sql, values);
            conn.release();
            return res.rows[0] ? true : false
        } catch (err) {
            throw new Error(`could not connect fetch data from the db ${err}`);
        }
    }
}