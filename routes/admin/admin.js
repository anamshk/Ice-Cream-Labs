const express = require('express');
const router  = express.Router();

//TWILIO SMS
const { orderAccepted, orderRejected, orderCompleted } = require("../../lib/twilio");

//ALL QUERIES
const getMenu = require('../../db/queries/getMenu');
const addMenuItem = require('../../db/queries/addMenuItem');
const removeMenuItem = require('../../db/queries/removeMenuItem');
const {orders, orderById, allOrders} = require('../../db/queries/getOrders');
const updateMenuItem = require('../../db/queries/updateMenu');
const updateStatus = require('../../db/queries/updateOrder');



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
  const userID = req.session.userID;
  if (orderId) {
    updateStatus(orderId, 'completed')
      .then(()=> {
        res.redirect("/admin/orders_in_queue");
        orderCompleted(userID, orderId);
        return;
      });
      
  }
});

router.post('order/:id/accept', (req, res) => {
  const orderId = req.params.id;
  const userID = req.session.userID;
  if (orderId) {
    updateStatus(orderId, 'accepted')
      .then(()=> {
        res.redirect("/admin/orders_in_queue");
        orderAccepted(userID, orderId);
      });
  }
  
});
  

router.post('/order/:id/reject', (req, res) => {
  const orderId = req.params.id;
  const userID = req.session.userID;
  if (orderId) {
    updateStatus(orderId, 'rejected')
      .then(()=> {
        res.redirect("/admin/all_orders");
        orderRejected(userID, orderId);
      });
  }
});

module.exports = router;