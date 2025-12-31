import React, { useState, useEffect } from 'react';
import { tableService } from '../services';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Tables = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTable, setNewTable] = useState({ tableNumber: '', capacity: '' });
  const { user } = useAuth();

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await tableService.getTables();
      setTables(response.data);
    } catch (error) {
      toast.error('Failed to fetch tables');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTable = async (e) => {
    e.preventDefault();
    try {
      await tableService.createTable({
        tableNumber: parseInt(newTable.tableNumber),
        capacity: parseInt(newTable.capacity)
      });
      toast.success('Table created successfully');
      setShowAddModal(false);
      setNewTable({ tableNumber: '', capacity: '' });
      fetchTables();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create table');
    }
  };

  const handleStatusChange = async (tableId, newStatus) => {
    try {
      const assignedWaiter = newStatus === 'occupied' ? user.id : null;
      await tableService.updateTableStatus(tableId, newStatus, assignedWaiter);
      toast.success('Table status updated');
      fetchTables();
    } catch (error) {
      toast.error('Failed to update table status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-300';
      case 'occupied': return 'bg-red-100 text-red-800 border-red-300';
      case 'bill_requested': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return '✅';
      case 'occupied': return '👥';
      case 'bill_requested': return '💰';
      case 'closed': return '🔒';
      default: return '❓';
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
        <h2 className="text-3xl font-bold text-gray-900">Tables Management</h2>
        <div className="flex space-x-3">
          <button
            onClick={fetchTables}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            🔄 Refresh
          </button>
          {user?.role === 'manager' && (
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              + Add Table
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tables.map((table) => (
          <div
            key={table._id}
            className={`bg-white rounded-xl shadow-lg p-6 border-2 ${getStatusColor(table.status)} transform hover:scale-105 transition-all duration-200`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">
                Table {table.tableNumber}
              </h3>
              <span className="text-3xl">{getStatusIcon(table.status)}</span>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Capacity:</span> {table.capacity} people
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Status:</span>{' '}
                <span className="capitalize font-medium">{table.status.replace('_', ' ')}</span>
              </p>
              {table.assignedWaiter && (
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Waiter:</span> {table.assignedWaiter.username}
                </p>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              {table.status === 'available' && user?.role === 'waiter' && (
                <button
                  onClick={() => handleStatusChange(table._id, 'occupied')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition"
                >
                  Mark as Occupied
                </button>
              )}
              {table.status === 'occupied' && (
                <button
                  onClick={() => handleStatusChange(table._id, 'bill_requested')}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition"
                >
                  Request Bill
                </button>
              )}
              {table.status === 'bill_requested' && ['cashier', 'manager'].includes(user?.role) && (
                <button
                  onClick={() => handleStatusChange(table._id, 'closed')}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition"
                >
                  Mark as Closed
                </button>
              )}
              {table.status === 'closed' && (
                <button
                  onClick={() => handleStatusChange(table._id, 'available')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition"
                >
                  Make Available
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Table Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Add New Table</h3>
            <form onSubmit={handleCreateTable}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Table Number
                  </label>
                  <input
                    type="number"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={newTable.tableNumber}
                    onChange={(e) => setNewTable({ ...newTable, tableNumber: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Capacity
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={newTable.capacity}
                    onChange={(e) => setNewTable({ ...newTable, capacity: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                  Create Table
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tables;
