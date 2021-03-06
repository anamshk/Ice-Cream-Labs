-- Drop and recreate Users table
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(32) NOT NULL,
  email_address VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

-- drop and recreate items table
DROP TABLE IF EXISTS items CASCADE;

CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  photo_url VARCHAR(255) NOT NULL,
  price NUMERIC(3,2) NOT NULL,
  inventory INTEGER NOT NULL
);

-- drop and recreate orders tables
DROP TABLE IF EXISTS order_master CASCADE;
DROP TABLE IF EXISTS order_line_items CASCADE;

CREATE TABLE order_master (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  order_datetime TIMESTAMP,
  estimated_time TEXT,
  completion_datetime TIMESTAMP DEFAULT NULL,
  status TEXT
);

CREATE TABLE order_line_items (
  id SERIAL PRIMARY KEY NOT NULL,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
  order_master_id INTEGER REFERENCES order_master(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL
);


