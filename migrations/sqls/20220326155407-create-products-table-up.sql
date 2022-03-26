/* Replace with your SQL commands */
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    available_quantity INTEGER,
    price INTEGER,
    image_url VARCHAR(255),
    description VARCHAR(255),
    brand VARCHAR(100),
    owner_id INTEGER,
    discount INTEGER
);