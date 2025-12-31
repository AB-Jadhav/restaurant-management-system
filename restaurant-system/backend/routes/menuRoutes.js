const express = require('express');
const {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} = require('../controllers/menuController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getMenuItems)
  .post(protect, authorize('manager'), createMenuItem);

router.route('/:id')
  .get(protect, getMenuItem)
  .put(protect, authorize('manager'), updateMenuItem)
  .delete(protect, authorize('manager'), deleteMenuItem);

module.exports = router;
