import app from './app';
import dotenv from 'dotenv';
dotenv.config();

const PORT = String(process.env.PORT) || 5000;
const HOST = process.env.HOST || '127.0.0.1';

app.listen(PORT, function () {
    console.log(`starting app on: ${HOST}:${PORT}`);
});
