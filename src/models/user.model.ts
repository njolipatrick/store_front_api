// @ts-ignore
import client from "../../config/database";
import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";
const saltRounds = Number(process.env.SALT_ROUNDS);
const pepper = process.env.BCRYPT_PASSWORD;
const SECRET = String(process.env.TOKEN_SECRET);

export type User = {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
};

export class UserStore {
    async index(): Promise<User[]> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = "SELECT * FROM users";
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        } catch (err) {
            throw new Error(`could not connect fetch data from the db ${err}`);
        }
    }
    async show(ID: number): Promise<User[]> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = "SELECT * FROM users WHERE id = $1;";
            const values = [ID];
            const res = await conn.query(sql, values);
            return res.rows;
        } catch (err) {
            throw new Error(`could not connect fetch data from the db ${err}`);
        }
    }
    async register({ user }: { user: User }): Promise<User[]> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql =
                "INSERT INTO users (firstName, email, lastName, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
            const hashPassword = await bcrypt.hash(
                user.password + pepper,
                saltRounds
            );
            user.password = hashPassword;

            const values = [
                user.firstName,
                user.email,
                user.lastName,
                user.password,
                user.role,
            ];
            const res = await conn.query(sql, values);

            const token = sign({ user: res.rows[0] }, String(process.env.TOKEN_SECRET), {
                expiresIn: "7d",
            });
            conn.release();
            // @ts-ignore
            return [{ token: token }, res.rows];
        } catch (err) {
            throw new Error(`unable to register user ${err}`);
        }
    }
    async authenticate({
        email,
        password,
    }: {
        email: string;
        password: string;
    }): Promise<User[] | null> {
        try {
            const conn = await client.connect();
            const sql = "SELECT * FROM users WHERE email =$1";
            const result = await conn.query(sql, [email]);
            if (result.rows.length) {
                const user = result.rows[0];
                const checkUser = await bcrypt.compare(
                    password + pepper,
                    user.password
                );

                if (!checkUser) {
                    throw new Error(`Invalid login credentials`);
                }

                const token = sign({ user: user }, String(process.env.TOKEN_SECRET), {
                    expiresIn: "7d",
                });

                //@ts-ignore
                return [{ token: token }, user];
            }
            return null;
        } catch (error) {
            throw new Error(`unable to login use ${error}`);
        }
    }
    async destroy({ id }: { id: number }): Promise<User[]> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = "DELETE FROM users WHERE id = $1 RETURNING *;";
            const values = [id];
            const res = await conn.query(sql, values);
            conn.release();

            return res.rows;
        } catch (err) {
            throw new Error(`could not connect fetch data from the db ${err}`);
        }
    }
    async checker({ email }: { email: string; }): Promise<Boolean> {
        try {
            const conn = await client.connect();
            const sql = "SELECT * FROM users WHERE email = $1";
            const values = [email];
            const res = await conn.query(sql, values);

            conn.release();
            return res.rows[0] ? true : false;
        } catch (err) {
            throw new Error(`could not connect fetch data from the db ${err}`);
        }
    }
    async getRole(TOKEN: string): Promise<string> {

        const email = this.userinfo(TOKEN).email;

        try {
            const conn = await client.connect();
            const sql = "SELECT * FROM users WHERE email = $1;";
            const values = [email];
            const res = await conn.query(sql, values);

            conn.release();

            return res.rows[0].role;
        } catch (err) {
            throw new Error(`could not connect fetch data from the db ${err}`);
        }
    }
    userinfo(TOKEN: string): User {
        const user = verify(TOKEN, SECRET) as unknown as User;

        //@ts-ignore
        return user.user;
    }
}
