const express = require('express');
// const db = require('../../lib/db');
const getMenu = require('../../db/queries/getMenu');
const addMenuItem = require('../../db/queries/addMenuItem');
const removeMenuItem = require('../../db/queries/removeMenuItem');
const {orders, orderById, allOrders} = require('../../db/queries/getOrders');
const { route } = require('../register');
const updateMenuItem = require('../../db/queries/updateMenu');
const updateStatus = require('../../db/queries/updateOrder');
const router  = express.Router();

const accountSid = 'AC125bc05f49eaf635e3cbd332512a809b';
const authToken = '7c7cfc95820c8356d79c8aa8717080c5';

const client = require('twilio')(accountSid, authToken);

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
        order: order
      };
      res.render("order_id", templateVars);
    })
    .catch((err) => {
      console.log('error', err);
    });
});

router.get('/all_orders', (req, res) => {
  return allOrders()
    .then(order => {
      const templateVars = {
        orders: order
      };
      res.render("all_orders", templateVars);
    });
});

//POSTS
router.post('/item/:id', (req, res) => {
  const item = req.body;
  console.log(item);
  if (item) {
    updateMenuItem(item)
      .then(()=> res.redirect("/admin/admin_menu"));
  } else {
    addMenuItem(item)
      .then(()=> res.redirect("/admin/admin_menu"));
  }
});

router.post('/item/:id/delete', (req, res) => {
  const itemId = req.params.id;
  if (itemId) {
    removeMenuItem(itemId)
      .then(() => {
        res.redirect("/admin/admin_menu");
      });
  }
});

// TWILIO SMS WHEN ORDER COMPLETE
router.post('/order/:id/update', (req, res) => {
  const orderId = req.params.id;
  if (orderId) {
    updateStatus(orderId, 'completed')
      .then(()=> {
        res.redirect("/admin/orders_in_queue");
      });
      
    client.messages
      .create({
        body: 'Your order is ready for pickup.',
        from: '+12264068998',
        to: '+16476361869'
      })
      .then(message => console.log(message.sid));
  } else {
    updateStatus(orderId, 'accepted')
      .then(()=> {
        res.redirect("/admin/orders_in_queue");
      });
      
    client.messages
      .create({
        body: 'Your order has been accepted.',
        from: '+12264068998',
        to: '+16476361869'
      })
      .then(message => console.log(message.sid));

  }
});

router.post('/order/:id/reject', (req, res) => {
  const orderId = req.params.id;
  if (orderId) {
    updateStatus(orderId, 'rejected')
      .then(()=> {
        res.redirect("/admin/all_orders");
      });
  }

  client.messages
    .create({
      body: 'Your order has been rejected.',
      from: '+12264068998',
      to: '+16476361869'
    })
    .then(message => console.log(message.sid));
});

module.exports = router;