-- Users table seeds here (Example)
-- Users table seeds here (Example)
INSERT INTO users (name, phone_number, email_address, password, is_admin) 
VALUES ('Alice', '412-323-4567', 'alice@gmail.com' , 'password', FALSE);
INSERT INTO users (name, phone_number, email_address, password, is_admin)
VALUES ('Kira', '989-706-6637','email@email.com', 'password', TRUE);
INSERT INTO users (name, phone_number, email_address, password, is_admin)
VALUES ('John', '606-151-0345','email@email.com', 'password', False);

-- $2a$10$8nD82z.sMY./VZD0OUNtKub3gzGX/zwAzjL/MX2J0v0OM6OS65/Gq --> pass

INSERT INTO users (name, phone_number, email_address, password, is_admin)
VALUES ('admin', '606-151-0345','admin@email.com', '$2a$10$8nD82z.sMY./VZD0OUNtKub3gzGX/zwAzjL/MX2J0v0OM6OS65/Gq', True);

-- INSERT INTO items (title, description, photo_url, price, inventory) VALUES ('Holiday Special - Bacio', 'Chocolate/hazelnut with Nutella drizzle', 'https://cdn.shopify.com/s/files/1/0552/4953/5154/products/BACIO_900x.jpg?v=1628700067', 4.00, 250);
-- INSERT INTO items (title, description, photo_url, price, inventory) VALUES ('Cappuccino', 'Hearty fall flavour sure to warm up your insides, and give you a little caffeine shot.', 'https://cdn.shopify.com/s/files/1/0552/4953/5154/products/TIRAMISU_b79607cf-46cb-4d58-acf0-0c33b38c8e11_900x.jpg?v=1631623956', 3.25, 200);
-- INSERT INTO items (title, description, photo_url, price, inventory) VALUES ('Apple Pie', 'Limited time special - Delicious warm/cold apple pie :)', 'https://cdn.shopify.com/s/files/1/0552/4953/5154/products/2021BURBONCARAMEL_618f1787-6207-4e8d-9f76-31aac4e50b1b_900x.jpg?v=1632571888', 3.25, 50);
-- INSERT INTO items (title, description, photo_url, price, inventory) VALUES ('Yogurt Frutti Di Bosco', 'A yogurty mix of three types of berries, blueberry, raspberry and black cherries.', 'https://cdn.shopify.com/s/files/1/0552/4953/5154/products/2021YOGURTFRUTTIDIBOSCO_29bc3722-2d4b-47ad-a0fe-e2f3fbbe5d13_900x.jpg?v=1628699911', 3.50, 50)
-- INSERT INTO items (title, description, photo_url, price, inventory) VALUES ('Oreo Cookie', 'You all know it... Very Limited Quantities Oreo Cookie :)', 'https://cdn.shopify.com/s/files/1/0552/4953/5154/products/2021STRACIATELLA_900x.jpg?v=1622264668', 3.50, 100)
-- INSERT INTO items (title, description, photo_url, price, inventory) VALUES ('Pumpkin Spice', 'Fall limited time flavour - locally sourced pumpkins blended with your favourite spices (cinnamon).', 'https://cdn.shopify.com/s/files/1/0552/4953/5154/products/2021PEACH_331d03bb-5345-4778-a7c4-4a16b820bbd0_900x.jpg?v=1632439247', 3.50, 100)
-- INSERT INTO items (title, description, photo_url, price, inventory) VALUES ('Mint Chocolate', 'Minty fresh with chocolate chunks.', 'https://cdn.shopify.com/s/files/1/0552/4953/5154/products/MINTCHOCOLATE_900x.jpg?v=1621484762', 3.25,100)

INSERT INTO order_master (user_id, order_datetime, estimated_time, completion_datetime, status) VALUES (1, '2021-12-03 09:59:11', 'Order will complete in 15 minutes', '2021-12-03 10:11:21', 'completed');
INSERT INTO order_master (user_id, order_datetime, estimated_time, completion_datetime, status) VALUES (1, '2021-12-03 13:30:17', 'Order will complete in 15 minutes', NULL, 'rejected');
INSERT INTO order_master (user_id, order_datetime, estimated_time, completion_datetime, status) VALUES (3, '2021-12-03 15:14:07', 'Order will complete in 15 minutes', '', 'submitted');
INSERT INTO order_master (user_id, order_datetime, estimated_time, completion_datetime, status) VALUES (3, '2021-12-03 20:56:56', 'Order will complete in 15 minutes', '', 'accepted');


INSERT INTO items (title, description, photo_url, price, inventory) 
VALUES 
(
	'Vanilla Cone', 
	'Enjoy our creamy vanilla soft serve in a crispy cone!',
	'https://i.postimg.cc/ZKYCZw5q/cone-vanilla.jpg',
	2.00,
	300
);

INSERT INTO items (title, description, photo_url, price, inventory) 
VALUES 
(
	'Chocolate Cone', 
	'Enjoy our rich chocolate soft serve in a crispy cone!',
	'https://i.postimg.cc/sxs1McPw/cone-chocolate.jpg',
	2.00,
	300
);

INSERT INTO items (title, description, photo_url, price, inventory) 
VALUES 
(
	'Sparkly Cone', 
	'Enjoy a taste of raibow!',
	'https://i.postimg.cc/65HTQC8f/cone-sparkly.jpg',
	3.00,
	300
);

INSERT INTO items (title, description, photo_url, price, inventory) 
VALUES 
(
	'Avocado Cone', 
	'Enjoy our limited edition soft serve avocado goodness in a crispy cone!',
	'https://i.postimg.cc/K8Rj34LS/cone-avocado.jpg',
	4.00,
	50
);


INSERT INTO items (title, description, photo_url, price, inventory) 
VALUES 
(
	'Vanilla Cup', 
	'Enjoy our silky vanilla ice-cream in a cup. Delicious!',
	'https://i.postimg.cc/dQjLzbvX/cup-vanilla.jpg',
	5.00,
	300
);



INSERT INTO items (title, description, photo_url, price, inventory) 
VALUES 
(
	'Sparkly Cup', 
	'Silky vanilla ice-cream meets rainbow! Try this award-winning flavour.',
	'https://i.postimg.cc/PJyJYw2h/cup-sparkly.jpg',
	7.00,
	200
);





INSERT INTO order_line_items (item_id, order_master_id, quantity) VALUES (6, 1, 1);
INSERT INTO order_line_items (item_id, order_master_id, quantity) VALUES (2, 2, 1);
INSERT INTO order_line_items (item_id, order_master_id, quantity) VALUES (3, 3, 1);
INSERT INTO order_line_items (item_id, order_master_id, quantity) VALUES (5, 4, 1);

