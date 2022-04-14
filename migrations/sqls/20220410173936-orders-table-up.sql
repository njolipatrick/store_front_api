/* Replace with your SQL commands */
CREATE TABLE orders (
  id serial PRIMARY KEY,
  status VARCHAR(255) NOT NULL,
  user_id integer REFERENCES users (id) ON DELETE CASCADE,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
);
