const express = require('express');
const db = require('../../lib/db');
const getMenu = require('../../db/queries/getMenu');
const addMenuItem = require('../../db/queries/addMenuItem');
const removeMenuItem = require('../../db/queries/removeMenuItem');
const getOrders = require('../../db/queries/getOrders');
const { route } = require('../register');
const router  = express.Router();


//GET THE ORDERS HOME PAGE FOR THE ADMIN

router.get('/', (req, res)=> {
  res.render("dashboard");
});

router.get('/admin_menu', (req, res)=> {
  return getMenu.getItems()
    .then(menu => {
      // console.log("ITEMS:   ");
      console.log(menu);
      const templateVars = {
        items: menu
      };
      res.render("admin_menu", templateVars);
    });
});

router.get('/admin_edit/', (req, res) => {
  res.render("admin_edit");
});

router.get('/admin_edit/:id', (req, res) => {
  getMenu.getItemId(req.params.id)
    .then(item => {
      const templateVars = {
        item: item
      };
      res.render("admin_edit", templateVars);
    });
  
});

router.get('/orders_in_queue', (req, res) => {
  return getOrders.getOrders()
    .then(order => {
      // console.log("ITEMS:   ");
      console.log(order);
      const templateVars = {
        orders: order
      };
      res.render("orders_in_queue", templateVars);
    });
});


router.get('/order/:id', (req, res) => {
  res.render("order_id");
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
  console.log("ITS HERE");
  const itemId = req.params.id;
  removeMenuItem(itemId)
    .then(() => {
      res.redirect("/admin/admin_menu");
    });
 
});

router.post('/order/:id', (req, res) => {
  const itemId = req.body[0];
  // queries.orderId(itemId);
});

module.exports = router;