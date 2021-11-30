-- drop and recreate orders tables
DROP TABLE IF EXISTS order_master CASCADE;
DROP TABLE IF EXISTS order_line_items CASCADE;

CREATE TABLE order_master (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  order_datetime TIMESTAMP,
  estimated_time TEXT,
  completion_datetime TIMESTAMP,
  status TEXT
);

CREATE TABLE order_line_items (
  id SERIAL PRIMARY KEY NOT NULL,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
  order_master_id INTEGER REFERENCES order_master(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL
);

