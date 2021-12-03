/* eslint-disable camelcase */
const express = require('express');
const router  = express.Router();

//TWILIO SMS
const { orderAccepted, orderRejected, orderCompleted } = require("../../lib/twilio");

//ALL QUERIES
const getMenu = require('../../db/queries/getMenu');
const addMenuItem = require('../../db/queries/addMenuItem');
const removeMenuItem = require('../../db/queries/removeMenuItem');
const getOrders = require('../../db/queries/getOrders');
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
    inventory: null,
    url: '/admin/item'
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
        inventory: item.inventory,
        url: '/admin/item/:id'
      };
      res.render("admin_edit", templateVars);
    });
  
});

router.get('/orders_in_queue', (req, res) => {
  return getOrders.orders()
    .then(orderMasters => {
      console.log(orderMasters);
      let orders = {};
      for (let o of orderMasters) {
        if (!o.id) {
          continue;
        }
        if (orders[o.id]) {
          let itemDetails = {
            title: o.title,
            price: o.price,
            quantity: o.quantity
          };
          orders[o.id].details.total += o.price * o.quantity;
          orders[o.id].items.push(itemDetails);
        } else {
          let orderDetails = {
            id: o.id,
            user_id: o.user_id,
            order_datetime: o.order_datetime,
            estimated_time: o.estimated_time,
            completion_datetime: o.completion_datetime,
            status: o.status,
            name: o.name,
            phone_number: o.phone_number,
            total: o.price * o.quantity
          };
          let itemDetails = {
            title: o.title,
            price: o.price,
            quantity: o.quantity
          };


          orders[o.id] = {
            details: orderDetails,
            items: [itemDetails]
          };
        }
      }
      for (let order in orders) {
        console.log(orders[order]);
      }
      const templateVars = {
        orders: orders
      };
      res.render("orders_in_queue", templateVars);
    });
});


router.get('/order/:id', (req, res) => {
  return getOrders.orderById(req.params.id)
    .then(order => {
      getOrders.orderLines(order.id)
        .then(lines => {
          console.log(lines);
          let total = 0;
          for (let i in lines) {
            total += lines[i].price * lines[i].quantity;
          }

          order.total = total;
          const templateVars = {
            order: order,
            items: lines
          };
          console.log(templateVars);
          res.render("order_id", templateVars);
        });
    });
  // .catch((err) => {
  //   console.log('error', err);
  // });
});

router.get('/all_orders', (req, res) => {
  return getOrders.allOrders()
    .then(orderMasters => {
      let orders = {};
      for (let o of orderMasters) {
        if (!o.name) {
          continue;
        }
        if (orders[o.order_master_id]) {
          let itemDetails = {
            title: o.title,
            price: o.price,
            quantity: o.quantity
          };
          orders[o.order_master_id].details.total += o.price * o.quantity;
          orders[o.order_master_id].items.push(itemDetails);
        } else {
          let orderDetails = {
            id: o.order_master_id,
            user_id: o.user_id,
            order_datetime: o.order_datetime,
            estimated_time: o.estimated_time,
            completion_datetime: o.completion_datetime,
            status: o.status,
            name: o.name,
            phone_number: o.phone_number,
            total: o.price * o.quantity
          };
          let itemDetails = {
            title: o.title,
            price: o.price,
            quantity: o.quantity
          };


          orders[o.order_master_id] = {
            details: orderDetails,
            items: [itemDetails]
          };
        }
      }
      for (let order in orders) {
        console.log(orders[order]);
      }
      
      const templateVars = {
        orders: orders
      };
      res.render("all_orders", templateVars);
    });
});

//POSTS
//update and item
router.post('/item', (req, res) => {
  const item = req.body;
  console.log("ITS HERE");
  if (item) {
    addMenuItem(item)
      .then(()=> res.redirect("/admin/admin_menu"));
  }
});

router.post('/item/:id', (req,res) => {
  const item = req.body;
  if (item) {
    updateMenuItem(item)
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

router.post('/order/:id/accept', (req, res) => {
  const orderId = req.params.id;
  const userID = req.session.userID;
  console.log("ORDER IN ACCPETED: ", orderId);
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