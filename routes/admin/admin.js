const express = require('express');
const db = require('../../lib/db');
const getMenu = require('../../db/queries/getMenu');
const addMenuItem = require('../../db/queries/addMenuItem');
const removeMenuItem = require('../../db/queries/removeMenuItem');
const {orders, orderById} = require('../../db/queries/getOrders');
const { route } = require('../register');
const update = require('../../db/queries/updateOrder');
const router  = express.Router();


//GET THE ORDERS HOME PAGE FOR THE ADMIN

router.get('/', (req, res)=> {
  res.render("dashboard");
});

router.get('/admin_menu', (req, res)=> {
  return getMenu.getItems()
    .then(menu => {
      const templateVars = {
        items: menu
      };
      res.render("admin_menu", templateVars);
    });
});

router.get('/admin_edit/', (req, res) => {
  const templateVars = {
    id: null,
    title: null,
    description: null,
    price: null,
    photo_url: null,
    inventory: null
  };
  res.render("admin_edit", templateVars);
});

router.get('/admin_edit/:id', (req, res) => {
  getMenu.getItemId(req.params.id)
    .then(item => {
      const templateVars = {
        id: item.id,
        title: item.title,
        description: item.description,
        price: item.price,
        photo_url: item.photo_url,
        inventory: item.inventory
      };
      res.render("admin_edit", templateVars);
    });
  
});

router.get('/orders_in_queue', (req, res) => {
  return orders()
    .then(order => {
      console.log(order);
      const templateVars = {
        orders: order
      };
      res.render("orders_in_queue", templateVars);
    });
});


router.get('/order/:id', (req, res) => {
  return orderById(req.params.id)
    .then(order => {
      const templateVars = {
        OrderById: order
      };
      res.render("order_id", templateVars);
    })
    .catch((err) => {
      console.log('error', err);
    });
});

//POSTS
router.post('/admin_add', (req, res) => {
  const item = req.body;
  if (item.id) {
    // TODO: update menu item
  }
  addMenuItem(item);
});

// router.post('/item/:id', (req, res) => {
//   const item = req.body;
//   removeMenuItem(item);
// });

router.post('/item/:${id/delete', (req, res) => {
  const itemId = req.params.id;
  removeMenuItem(itemId)
    .then(() => {
      res.redirect("/admin/admin_menu");
    });
 
});

router.post('/order/', (req, res) => {
  const orderId = req.params.id;
  update(orderId)
    .then(()=> {
      res.redirect("/admin/orders_in_queue");
    });
  // if (order.id) {

  // };
  // queries.orderId(itemId);
});

module.exports = router;