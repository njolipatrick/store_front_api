/* Replace with your SQL commands */
CREATE TABLE orders (
  id serial PRIMARY KEY,
  status VARCHAR(255) NOT NULL,
  user_id integer REFERENCES users (id) ON DELETE CASCADE,
  created_at timestamp without time zone NOT NULL,
  updated_at timestamp without time zone NOT NULL
);
