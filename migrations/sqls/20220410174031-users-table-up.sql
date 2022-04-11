/* Replace with your SQL commands */
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    email VARCHAR(50) UNIQUE,
    role VARCHAR(10),
    password VARCHAR(100)
);