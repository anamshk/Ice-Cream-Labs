-- Users table seeds here (Example)
INSERT INTO users (name, phone_number, email_address, password, is_admin) VALUES ('Alice', '412-323-4567', 'password', FALSE);
INSERT INTO users (name, phone_number, email_address, password, is_admin) VALUES ('Kira', '989-706-6637', 'password', TRUE);

INSERT INTO items (title, description, photo_url, price, tags, inventory) VALUES ('Holiday Special - Bacio', 'Chocolate/hazelnut with Nutella drizzle', 'https://cdn.shopify.com/s/files/1/0552/4953/5154/products/BACIO_900x.jpg?v=1628700067', $4.00, 'available: diary-free', 250);
INSERT INTO items (title, description, photo_url, price, tags, inventory) VALUES ('Cappuccino', 'Hearty fall flavour sure to warm up your insides, and give you a little caffeine shot.', 'https://cdn.shopify.com/s/files/1/0552/4953/5154/products/TIRAMISU_b79607cf-46cb-4d58-acf0-0c33b38c8e11_900x.jpg?v=1631623956', $3.25, 'available: regular, decaf', 200);
INSERT INTO items (title, description, photo_url, price, tags, inventory) VALUES ('Apple Pie', 'Limited time special - Delicious warm/cold apple pie :)', 'https://cdn.shopify.com/s/files/1/0552/4953/5154/products/2021BURBONCARAMEL_618f1787-6207-4e8d-9f76-31aac4e50b1b_900x.jpg?v=1632571888', $3.25, 'regular', 50);
INSERT INTO items (title, description, photo_url, price, tags, inventory) VALUES ('Yogurt Frutti Di Bosco', 'A yogurty mix of three types of berries, blueberry, raspberry and black cherries.', 'https://cdn.shopify.com/s/files/1/0552/4953/5154/products/2021YOGURTFRUTTIDIBOSCO_29bc3722-2d4b-47ad-a0fe-e2f3fbbe5d13_900x.jpg?v=1628699911', $3.50,, 50)
INSERT INTO items (title, description, photo_url, price, tags, inventory) VALUES ('Oreo Cookie', 'You all know it... Very Limited Quantities Oreo Cookie :)', 'https://cdn.shopify.com/s/files/1/0552/4953/5154/products/2021STRACIATELLA_900x.jpg?v=1622264668', $3.50, 'available: diary-free' 100)
INSERT INTO items (title, description, photo_url, price, tags, inventory) VALUES ('Pumpkin Spice', 'Fall limited time flavour - locally sourced pumpkins blended with your favourite spices (cinnamon).', 'https://cdn.shopify.com/s/files/1/0552/4953/5154/products/2021PEACH_331d03bb-5345-4778-a7c4-4a16b820bbd0_900x.jpg?v=1632439247', $3.50, 100)
INSERT INTO items (title, description, photo_url, price, tags, inventory) VALUES ('Mint Chocolate', 'Minty fresh with chocolate chunks.', 'https://cdn.shopify.com/s/files/1/0552/4953/5154/products/MINTCHOCOLATE_900x.jpg?v=1621484762', $3.25, ,100)

INSERT INTO order_master (user_id, order_line_item_id, order_datetime, completion_datetime, status) VALUES (2, 3,  );


INSERT INTO order_line_items ()