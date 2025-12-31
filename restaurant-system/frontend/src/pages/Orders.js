import React, { useState, useEffect } from 'react';
import { orderService, tableService, menuService } from '../services';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [tables, setTables] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderNotes, setOrderNotes] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [ordersRes, tablesRes, menuRes] = await Promise.all([
        orderService.getOrders(),
        tableService.getTables(),
        menuService.getMenuItems({ available: true })
      ]);
      setOrders(ordersRes.data);
      setTables(tablesRes.data.filter(t => t.status === 'available' || t.status === 'occupied'));
      setMenuItems(menuRes.data);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = () => {
    setSelectedItems([...selectedItems, { menuItem: '', quantity: 1, notes: '' }]);
  };

  const handleRemoveItem = (index) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...selectedItems];
    newItems[index][field] = value;
    setSelectedItems(newItems);
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    if (selectedItems.length === 0) {
      toast.error('Please add at least one item');
      return;
    }

    try {
      await orderService.createOrder({
        table: selectedTable,
        items: selectedItems,
        notes: orderNotes
      });
      toast.success('Order created successfully');
      closeModal();
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create order');
    }
  };

  const handleItemStatusChange = async (orderId, itemId, newStatus) => {
    try {
      await orderService.updateOrderItemStatus(orderId, itemId, newStatus);
      toast.success(`Item status updated to ${newStatus}`);
      fetchData();
    } catch (error) {
      toast.error('Failed to update item status');
    }
  };

  const handleOrderStatusChange = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      toast.success(`Order status updated to ${newStatus}`);
      fetchData();
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  const closeModal = () => {
    setShowCreateModal(false);
    setSelectedTable('');
    setSelectedItems([]);
    setOrderNotes('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Orders Management</h2>
        <div className="flex space-x-3">
          <button
            onClick={fetchData}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            🔄 Refresh
          </button>
          {user?.role === 'waiter' && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              + New Order
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div className="flex items-center space-x-4 mb-2 md:mb-0">
                <h3 className="text-xl font-bold text-gray-900">
                  Table {order.table?.tableNumber}
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                {order.status === 'active' && ['waiter', 'manager'].includes(user?.role) && (
                  <select
                    className="text-sm px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={order.status}
                    onChange={(e) => handleOrderStatusChange(order._id, e.target.value)}
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                )}
              </div>
              <div className="text-sm text-gray-600">
                <p><strong>Waiter:</strong> {order.waiter?.username}</p>
                <p><strong>Order Time:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700">Item</th>
                    <th className="text-center py-2 px-2 text-sm font-semibold text-gray-700">Qty</th>
                    <th className="text-right py-2 px-2 text-sm font-semibold text-gray-700">Price</th>
                    <th className="text-right py-2 px-2 text-sm font-semibold text-gray-700">Subtotal</th>
                    <th className="text-center py-2 px-2 text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items?.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-100">
                      <td className="py-3 px-2">
                        <p className="font-medium text-gray-900">{item.menuItem?.name}</p>
                        {item.notes && <p className="text-xs text-gray-500">{item.notes}</p>}
                      </td>
                      <td className="py-3 px-2 text-center">{item.quantity}</td>
                      <td className="py-3 px-2 text-right">${item.price?.toFixed(2)}</td>
                      <td className="py-3 px-2 text-right font-semibold">${item.subtotal?.toFixed(2)}</td>
                      <td className="py-3 px-2 text-center">
                        {order.status === 'active' ? (
                          <select
                            className="text-xs px-2 py-1 border border-gray-300 rounded capitalize focus:outline-none focus:ring-2 focus:ring-primary-500"
                            value={item.status}
                            onChange={(e) => handleItemStatusChange(order._id, item._id, e.target.value)}
                          >
                            <option value="pending">Pending</option>
                            <option value="preparing">Preparing</option>
                            <option value="ready">Ready</option>
                            <option value="served">Served</option>
                          </select>
                        ) : (
                          <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700 capitalize">
                            {item.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-gray-300">
                    <td colSpan="3" className="py-2 px-2 text-right font-semibold">Subtotal:</td>
                    <td className="py-2 px-2 text-right font-semibold">${order.subtotal?.toFixed(2)}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="py-2 px-2 text-right font-semibold">Tax (10%):</td>
                    <td className="py-2 px-2 text-right font-semibold">${order.tax?.toFixed(2)}</td>
                    <td></td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td colSpan="3" className="py-2 px-2 text-right font-bold text-lg">Total:</td>
                    <td className="py-2 px-2 text-right font-bold text-lg text-primary-600">${order.total?.toFixed(2)}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <p className="text-gray-500 text-lg">No orders found</p>
        </div>
      )}

      {/* Create Order Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full my-8">
            <h3 className="text-xl font-bold mb-4">Create New Order</h3>
            <form onSubmit={handleCreateOrder}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Table</label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(e.target.value)}
                  >
                    <option value="">Choose a table...</option>
                    {tables.map((table) => (
                      <option key={table._id} value={table._id}>
                        Table {table.tableNumber} ({table.capacity} seats) - {table.status}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order Items</label>
                  {selectedItems.map((item, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                      <select
                        required
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={item.menuItem}
                        onChange={(e) => handleItemChange(index, 'menuItem', e.target.value)}
                      >
                        <option value="">Select item...</option>
                        {menuItems.map((menuItem) => (
                          <option key={menuItem._id} value={menuItem._id}>
                            {menuItem.name} - ${menuItem.price}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        required
                        min="1"
                        placeholder="Qty"
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="w-full px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition"
                  >
                    + Add Item
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows="2"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Any special instructions..."
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                  Create Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
