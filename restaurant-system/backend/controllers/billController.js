const Bill = require('../models/Bill');
const Order = require('../models/Order');
const Table = require('../models/Table');
const { sendBillRequestNotification } = require('../utils/emailService');

// @desc    Get all bills
// @route   GET /api/bills
// @access  Private
exports.getBills = async (req, res) => {
  try {
    const { status, table } = req.query;
    
    let query = {};
    if (status) query.status = status;
    if (table) query.table = table;

    const bills = await Bill.find(query)
      .populate('order')
      .populate('table', 'tableNumber')
      .populate('generatedBy', 'username')
      .populate('paidBy', 'username')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: bills.length,
      data: bills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single bill
// @route   GET /api/bills/:id
// @access  Private
exports.getBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id)
      .populate({
        path: 'order',
        populate: { path: 'items.menuItem' }
      })
      .populate('table', 'tableNumber')
      .populate('generatedBy', 'username email')
      .populate('paidBy', 'username');

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: 'Bill not found'
      });
    }

    res.status(200).json({
      success: true,
      data: bill
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Generate bill for an order
// @route   POST /api/bills
// @access  Private (Waiter, Cashier)
exports.generateBill = async (req, res) => {
  try {
    const { orderId } = req.body;

    // Get order
    const order = await Order.findById(orderId)
      .populate('table')
      .populate('waiter', 'email');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (order.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Order is not active'
      });
    }

    // Check if bill already exists
    const existingBill = await Bill.findOne({ order: orderId, status: 'pending' });
    if (existingBill) {
      return res.status(400).json({
        success: false,
        message: 'Bill already exists for this order'
      });
    }

    // Create bill
    const bill = await Bill.create({
      order: orderId,
      table: order.table._id,
      subtotal: order.subtotal,
      tax: order.tax,
      total: order.total,
      generatedBy: req.user.id
    });

    // Update table status
    const table = await Table.findById(order.table._id);
    table.status = 'bill_requested';
    await table.save();

    // Send notification (optional - won't fail if email not configured)
    try {
      await sendBillRequestNotification(
        table.tableNumber,
        order.waiter.email,
        process.env.EMAIL_USER
      );
    } catch (emailError) {
      console.log('Email notification failed:', emailError.message);
    }

    const populatedBill = await Bill.findById(bill._id)
      .populate({
        path: 'order',
        populate: { path: 'items.menuItem' }
      })
      .populate('table', 'tableNumber')
      .populate('generatedBy', 'username');

    res.status(201).json({
      success: true,
      data: populatedBill
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Mark bill as paid
// @route   PUT /api/bills/:id/pay
// @access  Private (Cashier, Manager)
exports.payBill = async (req, res) => {
  try {
    const { paymentMethod } = req.body;
    
    const bill = await Bill.findById(req.params.id)
      .populate('order')
      .populate('table');

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: 'Bill not found'
      });
    }

    if (bill.status === 'paid') {
      return res.status(400).json({
        success: false,
        message: 'Bill is already paid'
      });
    }

    // Update bill
    bill.status = 'paid';
    bill.paymentMethod = paymentMethod;
    bill.paidAt = new Date();
    bill.paidBy = req.user.id;
    await bill.save();

    // Update order
    const order = await Order.findById(bill.order._id);
    order.status = 'completed';
    await order.save();

    // Update table
    const table = await Table.findById(bill.table._id);
    table.status = 'closed';
    table.closedAt = new Date();
    table.currentOrder = null;
    await table.save();

    const populatedBill = await Bill.findById(bill._id)
      .populate({
        path: 'order',
        populate: { path: 'items.menuItem' }
      })
      .populate('table', 'tableNumber')
      .populate('generatedBy', 'username')
      .populate('paidBy', 'username');

    res.status(200).json({
      success: true,
      data: populatedBill
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get bill statistics
// @route   GET /api/bills/stats
// @access  Private (Manager)
exports.getBillStats = async (req, res) => {
  try {
    const totalRevenue = await Bill.aggregate([
      { $match: { status: 'paid' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    const pendingBills = await Bill.countDocuments({ status: 'pending' });
    const paidBills = await Bill.countDocuments({ status: 'paid' });

    res.status(200).json({
      success: true,
      data: {
        totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
        pendingBills,
        paidBills
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
