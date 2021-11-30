const express = require('express');
const db = require('../../lib/db');
const { route } = require('../register');
const router  = express.Router();

//GET THE ORDERS HOME PAGE FOR THE ADMIN

router.get('/', (req, res)=> {
  res.render("dashboard");
});

router.get('/admin_menu', (req, res)=> {
  res.render("admin_menu");
});

router.get('/admin_edit', (req, res) => {
  res.render("admin_edit");
});

router.get('/orders_in_queue', (req, res) => {
  res.render("orders_in_queue");
});

router.get('/order/:id', (req, res) => {
  res.render("order/:id");
});

//POSTS
router.post('/admin_edit', (req, res) => {
  const item = req.body;
  console.log(item);
  db.addMenuItem(item);
});

router.post('/item/:id', (req, res) => {
  const item = req.body;
  console.log(item);
  db.removeMenuItem(item);
});

router.post('/order/:id', (req, res) => {
  const itemId = req.body[0];
  console.log(itemId);
  db.orderId(itemId);
});

module.exports = router;