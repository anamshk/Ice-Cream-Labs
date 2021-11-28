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
- get's index page with all items

GET /register
- renders registration form
- new user's can register to start placing an order
- new admin can register to review/accept order

GET /login 
- renders login page

GET /login:id
- logs in a dedicated user we have in our database for our demo Friday

GET /menu/:id
- retrieve information from db items table 
  - will show an item, description, photo_url, price, selection option for quantity
- user can start choosing the items and how much quantity they want

GET /cart
if user:
- gets a users orders 

GET /items
if admin
- gets an admins items for ordering and forms for add/edit/delete (routes below)

GET /item/id
if admin
- can edit/delete existing item

POST /login
- logs in users
- creates session cookie

POST /logout
- deletes session cookie

POST /register 
- saves user to database
- redirects to GET /login

POST /item
if admin
- can add new item