/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(100),
    users_id VARCHAR(100),
    order_status BOOLEAN NOT NULL,
    quantity_of_product INTEGER
);
