const express = require('express');
const db = require('../../lib/db');
const addMenuItem = require('../../db/queries/addMenuItem');
const { route } = require('../register');
const getMenu = require('../../db/queries/getMenu');
const router  = express.Router();


//GET THE ORDERS HOME PAGE FOR THE ADMIN

router.get('/', (req, res)=> {
  res.render("dashboard");
});

router.get('/admin_menu', (req, res)=> {
  return getMenu.getItems()
    .then(menu => {
      // console.log("ITEMS:   ");
      // console.log(menu);
      const templateVars = {
        items: menu
      };
      res.render("admin_menu", templateVars);
    });
});

router.get('/admin_edit', (req, res) => {
  res.render("admin_edit");
});

router.get('/orders_in_queue', (req, res) => {
  res.render("orders_in_queue");
});

router.get('/order/:id', (req, res) => {
  res.render("order_id");
});

//POSTS
router.post('/admin_add', (req, res) => {
  const item = req.body;
  console.log(item);
  addMenuItem(item);
});

router.post('/item/:id', (req, res) => {
  const item = req.body;
  console.log(item);
  // queries.removeMenuItem(item);
});

router.post('/order/:id', (req, res) => {
  const itemId = req.body[0];
  console.log(itemId);
  // queries.orderId(itemId);
});

module.exports = router;