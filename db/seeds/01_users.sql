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

INSERT INTO order_master (user_id, order_datetime, estimated_time, completion_datetime, status) VALUES (1, '2021-12-03 09:59:11', 'Order will complete in 15 minutes', '2021-12-03 10:11:21', 'completed');
INSERT INTO order_master (user_id, order_datetime, estimated_time, completion_datetime, status) VALUES (1, '2021-12-03 13:30:17', 'Order will complete in 15 minutes', NULL, 'rejected');
INSERT INTO order_master (user_id, order_datetime, estimated_time, completion_datetime, status) VALUES (3, '2021-12-03 15:14:07', 'Order will complete in 15 minutes', NULL, 'submitted');
INSERT INTO order_master (user_id, order_datetime, estimated_time, completion_datetime, status) VALUES (3, '2021-12-03 20:56:56', 'Order will complete in 15 minutes', NULL, 'accepted');


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

