/* Replace with your SQL commands */
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price INTEGER,
    category VARCHAR(100),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);