const Order = require('../models/Order');
const Table = require('../models/Table');
const MenuItem = require('../models/MenuItem');

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private
exports.getOrders = async (req, res) => {
  try {
    const { status, table } = req.query;
    
    let query = {};
    if (status) query.status = status;
    if (table) query.table = table;

    const orders = await Order.find(query)
      .populate('table', 'tableNumber')
      .populate('waiter', 'username')
      .populate('items.menuItem')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('table', 'tableNumber')
      .populate('waiter', 'username email')
      .populate('items.menuItem');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private (Waiter)
exports.createOrder = async (req, res) => {
  try {
    const { table, items, notes } = req.body;

    // Validate table
    const tableDoc = await Table.findById(table);
    if (!tableDoc) {
      return res.status(404).json({
        success: false,
        message: 'Table not found'
      });
    }

    // Process items
    const orderItems = [];
    for (let item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      if (!menuItem) {
        return res.status(404).json({
          success: false,
          message: `Menu item ${item.menuItem} not found`
        });
      }
      
      if (!menuItem.isAvailable) {
        return res.status(400).json({
          success: false,
          message: `Menu item ${menuItem.name} is not available`
        });
      }

      orderItems.push({
        menuItem: item.menuItem,
        quantity: item.quantity,
        price: menuItem.price,
        subtotal: menuItem.price * item.quantity,
        notes: item.notes || ''
      });
    }

    // Create order
    const order = await Order.create({
      table,
      waiter: req.user.id,
      items: orderItems,
      notes: notes || ''
    });

    // Update table
    tableDoc.status = 'occupied';
    tableDoc.currentOrder = order._id;
    tableDoc.assignedWaiter = req.user.id;
    tableDoc.occupiedAt = new Date();
    await tableDoc.save();

    const populatedOrder = await Order.findById(order._id)
      .populate('table', 'tableNumber')
      .populate('waiter', 'username')
      .populate('items.menuItem');

    res.status(201).json({
      success: true,
      data: populatedOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add items to existing order
// @route   POST /api/orders/:id/items
// @access  Private (Waiter)
exports.addOrderItems = async (req, res) => {
  try {
    const { items } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (order.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Cannot add items to inactive order'
      });
    }

    // Process and add new items
    for (let item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      if (!menuItem || !menuItem.isAvailable) {
        continue;
      }

      order.items.push({
        menuItem: item.menuItem,
        quantity: item.quantity,
        price: menuItem.price,
        subtotal: menuItem.price * item.quantity,
        notes: item.notes || ''
      });
    }

    await order.save();

    const populatedOrder = await Order.findById(order._id)
      .populate('table', 'tableNumber')
      .populate('waiter', 'username')
      .populate('items.menuItem');

    res.status(200).json({
      success: true,
      data: populatedOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update order item status
// @route   PUT /api/orders/:orderId/items/:itemId
// @access  Private
exports.updateOrderItemStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const item = order.items.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Order item not found'
      });
    }

    item.status = status;
    await order.save();

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private (Manager only)
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    await order.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
