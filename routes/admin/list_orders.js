const express = require('express');
const router  = express.Router();

//GET THE ORDER list FOR THE ADMIN

router.get('/', (req, res)=> {
  res.render("list_orders");
});

module.exports = router;