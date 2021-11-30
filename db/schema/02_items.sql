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
