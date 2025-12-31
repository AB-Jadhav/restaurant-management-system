import React, { useState, useEffect } from 'react';
import { billService, orderService } from '../services';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState('');
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async () => {
    try {
      const filters = filter !== 'all' ? { status: filter } : {};
      const [billsRes, ordersRes] = await Promise.all([
        billService.getBills(filters),
        orderService.getOrders({ status: 'active' })
      ]);
      setBills(billsRes.data);
      setOrders(ordersRes.data);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateBill = async (e) => {
    e.preventDefault();
    try {
      await billService.generateBill(selectedOrder);
      toast.success('Bill generated successfully');
      setShowGenerateModal(false);
      setSelectedOrder('');
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate bill');
    }
  };

  const handlePayBill = async (e) => {
    e.preventDefault();
    try {
      await billService.payBill(selectedBill._id, paymentMethod);
      toast.success('Bill paid successfully');
      setShowPayModal(false);
      setSelectedBill(null);
      setPaymentMethod('cash');
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to process payment');
    }
  };

  const openPayModal = (bill) => {
    setSelectedBill(bill);
    setShowPayModal(true);
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
        <h2 className="text-3xl font-bold text-gray-900">Bills Management</h2>
        <div className="flex space-x-3">
          <button
            onClick={fetchData}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            🔄 Refresh
          </button>
          {['waiter', 'cashier', 'manager'].includes(user?.role) && (
            <button
              onClick={() => setShowGenerateModal(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              + Generate Bill
            </button>
          )}
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            filter === 'all' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          All Bills
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          ⏳ Pending
        </button>
        <button
          onClick={() => setFilter('paid')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            filter === 'paid' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          ✅ Paid
        </button>
      </div>

      {/* Bills List */}
      <div className="space-y-4">
        {bills.map((bill) => (
          <div key={bill._id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    Bill #{bill._id.slice(-6)}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    bill.status === 'paid' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {bill.status === 'paid' ? '✅ Paid' : '⏳ Pending'}
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Table:</strong> {bill.table?.tableNumber}</p>
                  <p><strong>Generated By:</strong> {bill.generatedBy?.username}</p>
                  <p><strong>Generated At:</strong> {new Date(bill.createdAt).toLocaleString()}</p>
                  {bill.status === 'paid' && (
                    <>
                      <p><strong>Paid By:</strong> {bill.paidBy?.username}</p>
                      <p><strong>Payment Method:</strong> {bill.paymentMethod?.toUpperCase()}</p>
                      <p><strong>Paid At:</strong> {new Date(bill.paidAt).toLocaleString()}</p>
                    </>
                  )}
                </div>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Subtotal: <span className="font-semibold">${bill.subtotal?.toFixed(2)}</span></p>
                  <p className="text-sm text-gray-600">Tax (10%): <span className="font-semibold">${bill.tax?.toFixed(2)}</span></p>
                  <p className="text-2xl font-bold text-primary-600">
                    Total: ${bill.total?.toFixed(2)}
                  </p>
                </div>
                {bill.status === 'pending' && ['cashier', 'manager'].includes(user?.role) && (
                  <button
                    onClick={() => openPayModal(bill)}
                    className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition"
                  >
                    💳 Process Payment
                  </button>
                )}
              </div>
            </div>

            {/* Order Items */}
            {bill.order?.items && (
              <div className="mt-4 border-t pt-4">
                <h4 className="font-semibold text-gray-700 mb-2">Order Items:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Item</th>
                        <th className="text-center py-2">Qty</th>
                        <th className="text-right py-2">Price</th>
                        <th className="text-right py-2">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bill.order.items.map((item, idx) => (
                        <tr key={idx} className="border-b">
                          <td className="py-2">{item.menuItem?.name}</td>
                          <td className="text-center py-2">{item.quantity}</td>
                          <td className="text-right py-2">${item.price?.toFixed(2)}</td>
                          <td className="text-right py-2">${item.subtotal?.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {bills.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <p className="text-gray-500 text-lg">No bills found</p>
        </div>
      )}

      {/* Generate Bill Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Generate Bill</h3>
            <form onSubmit={handleGenerateBill}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Active Order
                  </label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={selectedOrder}
                    onChange={(e) => setSelectedOrder(e.target.value)}
                  >
                    <option value="">Choose an order...</option>
                    {orders.map((order) => (
                      <option key={order._id} value={order._id}>
                        Table {order.table?.tableNumber} - ${order.total?.toFixed(2)} - {order.items?.length} items
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowGenerateModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                  Generate Bill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pay Bill Modal */}
      {showPayModal && selectedBill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Process Payment</h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-600 mb-1">Table {selectedBill.table?.tableNumber}</p>
              <p className="text-3xl font-bold text-primary-600">${selectedBill.total?.toFixed(2)}</p>
            </div>
            <form onSubmit={handlePayBill}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <div className="space-y-2">
                    {['cash', 'card', 'upi', 'other'].map((method) => (
                      <label key={method} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={paymentMethod === method}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="capitalize text-gray-700">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowPayModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                  Confirm Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bills;
