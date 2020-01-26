const express = require('express');
const OrdersController = require('../controllers/orders');

// Router is a sub package of the express
const router = express.Router();

router.get('/', OrdersController.orders_get_all);
router.post("/", OrdersController.orders_create_order);
router.get("/:orderId", OrdersController.orders_get_order);
router.delete("/:orderId", OrdersController.orders_delete_order);

module.exports = router;