/* eslint-disable indent */
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_DEV_DB,
    POSTGRES_TEST_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    NODE_ENV,
} = process.env;

let client;

if (NODE_ENV === 'prod') {
    console.log('::server in production mode');
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
} else if (NODE_ENV === 'test') {
    console.log('::server in test mode');
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
} else {
    console.log('::server in developer mode');
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DEV_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}

export default client;
