const express = require('express');
const db = require('../../lib/db');
const router  = express.Router();

//GET THE ORDERS HOME PAGE FOR THE ADMIN

router.get('/', (req, res)=> {
  res.render("dashboard");
});

router.get('/admin_menu', (req, res)=> {
  res.render("admin_menu");
});


router.get('/admin_edit', (req, res) => {
  res.render("admin_edit")
})

//POSTS
router.post('/admin_edit', (req, res) => {
  var item = req.body
  console.log(item)
  db.addMenuItem(item)
})


module.exports = router;