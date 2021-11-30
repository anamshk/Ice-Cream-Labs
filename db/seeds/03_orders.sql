INSERT INTO order_master (user_id, order_datetime, estimated_time, completion_datetime, status) VALUES (1, '2021-12-03 09:59:11', 'Order will complete in 15 minutes', '2021-12-03 10:11:21', 'completed');
INSERT INTO order_master (user_id, order_datetime, estimated_time, completion_datetime, status) VALUES (1, '2021-12-03 13:30:17', 'Order will complete in 15 minutes', NULL, 'rejected');
INSERT INTO order_master (user_id, order_datetime, estimated_time, completion_datetime, status) VALUES (3, '2021-12-03 15:14:07', 'Order will complete in 15 minutes', '2021-12-03 15:29:11', 'accepted');
INSERT INTO order_master (user_id, order_datetime, estimated_time, completion_datetime, status) VALUES (3, '2021-12-03 20:56:56', 'Order will complete in 15 minutes', '2021-12-03 21:09:18', 'completed');


INSERT INTO order_line_items (item_id, order_master_id, quantity) VALUES (7, 1, 1);
INSERT INTO order_line_items (item_id, order_master_id, quantity) VALUES (2, 2, 1);
INSERT INTO order_line_items (item_id, order_master_id, quantity) VALUES (3, 3, 1);
INSERT INTO order_line_items (item_id, order_master_id, quantity) VALUES (5, 4, 1);
