import app from './app';
import dotenv from 'dotenv';
dotenv.config();

const PORT = (process.env.PORT as unknown as number) || 5000;
const HOST = process.env.HOST || '127.0.0.1';

app.listen(PORT, function () {
    console.log(`starting app on: ${HOST}:${PORT}`);
});
