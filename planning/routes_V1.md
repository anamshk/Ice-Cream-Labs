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

GET /
- When user is not logged in
  - get's index page (has register button)
  - retrieve information from db items table 
    - will show an item, description, photo_url, price, selection option for quantity

- When user logged in is as customer:
- get's index page and..
  - can start choosing the items and how much quantity they want

-When user logged in is as admin:
- get's index page and..
  - admin can see all the items and have an add/edit/delete button beside each item
  - if an admin clicks edit it will redirect to /item/:id page to edit individual item
  - if an admin clicks on single add item button it redirects to /item/:id with null information

GET /register
- renders registration form
- new user's can register to start placing an order
- new admin can register to review/accept order

GET /login 
- renders login page
- if incorrect login redirects to 404 error page

<!-- GET /login/:id >>>>> do we really need this since the user wil be redirected to index page

- logs in a dedicated user we have in our database for our demo Friday -->

<!-- GET /menu
- retrieve information from db items table 
  - will show an item, description, photo_url, price, selection option for quantity
- user can start choosing the items and how much quantity they want -->

GET /cart
if user:
- user can submit the items they have in cart and place order 
- if an item no longer exist send an error message "This item is no longer available"

GET /404_page
- in correct login credentials

<!-- GET /items
if admin
- gets an admins items for ordering and forms for add/edit/delete (routes below) -->

<!-- GET /item/id >>>>>> this seems like a repeat of POST/item 
if admin
- can edit/delete existing item -->

POST /login
- logs in users
- creates session cookie

POST /logout
- deletes session cookie

POST /register 
- saves user to database
- once registered user 
- is redirected to index page

POST /cart
- user can checkout the order 

POST/order_confirmation
- user receives order confirmation with edit and delete option beside each item
- once admin accepts the order user cannot make any edits or deletes

POST /item
if admin
- can add new item 
- can edit the existing item 

POST item/:id/delete
- deletes the existing item from the index page