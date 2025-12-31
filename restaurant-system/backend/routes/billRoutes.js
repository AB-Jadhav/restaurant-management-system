const express = require('express');
const {
  getBills,
  getBill,
  generateBill,
  payBill,
  getBillStats
} = require('../controllers/billController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/stats', protect, authorize('manager', 'cashier', 'waiter'), getBillStats);

router.route('/')
  .get(protect, getBills)
  .post(protect, authorize('waiter', 'cashier', 'manager'), generateBill);

router.route('/:id')
  .get(protect, getBill);

router.put('/:id/pay', protect, authorize('cashier', 'manager'), payBill);

module.exports = router;
