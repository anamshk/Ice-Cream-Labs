BREAD
Browse  GET  '/'
Read    GET  '/:id'
Edit    POST '/:id/edit'
Add     POST '/'
Delete  POST '/:id/delete'

pages:
main  - menu - signup - login  - logout
signup
login 
logout
menu 
order
- order/edit
- order/delete
order confirmation
order complete

<!-- Main page -->

GET /
- When user is not logged in
  - get's index page (has register button)
  - retrieve information from db items table 
    - will show an item, description, photo_url, price

- When user logged in is as customer:
- get's index page and..
  - can start choosing the items and how much quantity they want

-When user logged in is as admin:
- get's index page and..
  - admin can see all the items and have an add/edit/delete button beside each item
  - if an admin clicks edit it will redirect to /item/:id page to edit individual item
  - if an admin clicks on single add item button it redirects to /item/:id with null information


<!-- REGISTRATION -->

GET /register
- renders registration form
- new user's can register to start placing an order
- new admin can register to review/accept order

POST /register 
- saves user to database
- once registered user 
- is redirected to index page

<!-- LOGIN -->

GET /login 
- renders login page

GET /login/:id 
- ONLY FOR DEMO PURPOSE: logs in a dedicated user we have in our database for our demo Friday

POST /login
- logs in users
- creates session cookie
- if incorrect login display error message "Incorrect email or password"

POST /logout
- deletes session cookie


<!-- CUSTOMER CART -->

GET /cart
if user:
- user can submit the items they have in cart and place order 
- if an item no longer exist send an error message "This item is no longer available"

POST/cart/:id
-users can edit or delete the item from the cart before checkout

POST /cart
- user can checkout the order 
- order gets posted on the /orders page for admin to accept/reject
- admin gets SMS notification of new order

POST/order_confirmation
- user receives order confirmation with edit and delete option beside each item
- once admin accepts the order user cannot make any edits or deletes
- order gets posted on the /orders page for admin to update


<!-- ERROR PAGE -->
GET /404_page
-  Users who don't have access to urls that don't have a valid id

<!-- ADMINS ADD new items -->

GET /new-item
if admin
- admin can add new item with a form that has item, description, photo_url, price, tags and quantity.

POST /new-item/
if admin 
- new item posted on the menu list

<!-- ADMINS EDIT / DELETE an existing item -->

GET /item/id 
if admin
- Allows admin to edit an existing item from the menu

POST /item/:id
if admin 
- can edit the existing item 

POST item/:id/delete
- deletes the existing item from the index page

<!-- ADMINS update the status of customer orders -->

POST/orders
- Admin updates the status of the order from Accepted/Rejected to Completed
- If admin rejects the order the customer will receive a notification via SMS/email
- If admin accepts the order the customer will receive a notification along with standard message "Order should be ready in 15 minutes." via SMS/email
- Once admin completes the order customer will receive notification "Order is ready for pickup"