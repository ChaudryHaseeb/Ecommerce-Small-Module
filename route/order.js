const express = require('express');
const { create, cancel, get_order, get_orders } = require('../controller/order_controller');


const router = express.Router();

router.post('/order', create);
router.get("/order/:id", get_order);
router.get("/orders", get_orders);
router.put("/order/:id", cancel);


module.exports = router;