const express = require('express');
const {
  getTables,
  getTable,
  createTable,
  updateTableStatus,
  deleteTable
} = require('../controllers/tableController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getTables)
  .post(protect, authorize('manager'), createTable);

router.route('/:id')
  .get(protect, getTable)
  .delete(protect, authorize('manager'), deleteTable);

router.put('/:id/status', protect, updateTableStatus);

module.exports = router;
