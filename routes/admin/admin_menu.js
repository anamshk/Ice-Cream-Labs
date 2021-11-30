const express = require('express');
const router  = express.Router();

//GET THE ORDERS HOME PAGE FOR THE ADMIN

router.get('/', (req, res)=> {
  res.render("admin_menu");
});

module.exports = router;