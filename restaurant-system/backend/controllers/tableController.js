const Table = require('../models/Table');
const Order = require('../models/Order');

// @desc    Get all tables
// @route   GET /api/tables
// @access  Private
exports.getTables = async (req, res) => {
  try {
    const tables = await Table.find()
      .populate('assignedWaiter', 'username')
      .populate('currentOrder')
      .sort('tableNumber');

    res.status(200).json({
      success: true,
      count: tables.length,
      data: tables
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single table
// @route   GET /api/tables/:id
// @access  Private
exports.getTable = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id)
      .populate('assignedWaiter', 'username email')
      .populate({
        path: 'currentOrder',
        populate: { path: 'items.menuItem' }
      });

    if (!table) {
      return res.status(404).json({
        success: false,
        message: 'Table not found'
      });
    }

    res.status(200).json({
      success: true,
      data: table
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new table
// @route   POST /api/tables
// @access  Private (Manager only)
exports.createTable = async (req, res) => {
  try {
    const table = await Table.create(req.body);

    res.status(201).json({
      success: true,
      data: table
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update table status
// @route   PUT /api/tables/:id/status
// @access  Private
exports.updateTableStatus = async (req, res) => {
  try {
    const { status, assignedWaiter } = req.body;
    const table = await Table.findById(req.params.id);

    if (!table) {
      return res.status(404).json({
        success: false,
        message: 'Table not found'
      });
    }

    table.status = status;
    
    if (status === 'occupied') {
      table.occupiedAt = new Date();
      if (assignedWaiter) {
        table.assignedWaiter = assignedWaiter;
      }
    } else if (status === 'closed') {
      table.closedAt = new Date();
      table.currentOrder = null;
      table.assignedWaiter = null;
    } else if (status === 'available') {
      table.occupiedAt = null;
      table.closedAt = null;
      table.currentOrder = null;
      table.assignedWaiter = null;
    }

    await table.save();

    res.status(200).json({
      success: true,
      data: table
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete table
// @route   DELETE /api/tables/:id
// @access  Private (Manager only)
exports.deleteTable = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);

    if (!table) {
      return res.status(404).json({
        success: false,
        message: 'Table not found'
      });
    }

    await table.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Table deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
