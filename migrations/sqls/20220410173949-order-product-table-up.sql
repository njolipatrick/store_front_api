/* Replace with your SQL commands */
CREATE TABLE order_product (
  id serial PRIMARY KEY,
  quantity INTEGER NOT NULL,
  order_id integer REFERENCES orders (id) ON DELETE CASCADE,
  product_id integer REFERENCES products (id) ON DELETE CASCADE,
  created_at timestamp without time zone NOT NULL,
  updated_at timestamp without time zone NOT NULL
);