const express = require('express');
const {
  getOrders,
  getOrder,
  createOrder,
  addOrderItems,
  updateOrderItemStatus,
  updateOrderStatus,
  deleteOrder
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getOrders)
  .post(protect, authorize('waiter', 'manager'), createOrder);

router.route('/:id')
  .get(protect, getOrder)
  .delete(protect, authorize('manager'), deleteOrder);

router.post('/:id/items', protect, authorize('waiter', 'manager'), addOrderItems);
router.put('/:orderId/items/:itemId', protect, updateOrderItemStatus);
router.put('/:id/status', protect, updateOrderStatus);

module.exports = router;
