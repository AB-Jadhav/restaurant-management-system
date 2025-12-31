import React, { useState, useEffect } from 'react';
import { billService, orderService, tableService } from '../services';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [billStats, tables, orders, bills] = await Promise.all([
        billService.getBillStats(),
        tableService.getTables(),
        orderService.getOrders({ status: 'active' }),
        billService.getBills({ status: 'pending' })
      ]);

      const availableTables = tables.data.filter(t => t.status === 'available').length;
      const occupiedTables = tables.data.filter(t => t.status === 'occupied').length;
      const billRequestedTables = tables.data.filter(t => t.status === 'bill_requested').length;

      // Check for pending bills older than 30 minutes
      const pendingBillsAlerts = bills.data.filter(bill => {
        const minutesPending = Math.floor((Date.now() - new Date(bill.createdAt)) / (1000 * 60));
        return minutesPending > 30;
      });

      setStats({
        ...billStats.data,
        totalTables: tables.count,
        availableTables,
        occupiedTables,
        billRequestedTables,
        activeOrders: orders.count,
        pendingBillsAlerts
      });
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const statCards = [
    { title: 'Total Revenue', value: `$${stats?.totalRevenue?.toFixed(2) || '0.00'}`, icon: '💰', color: 'bg-green-500' },
    { title: 'Pending Bills', value: stats?.pendingBills || 0, icon: '📋', color: 'bg-yellow-500' },
    { title: 'Paid Bills', value: stats?.paidBills || 0, icon: '✅', color: 'bg-blue-500' },
    { title: 'Active Orders', value: stats?.activeOrders || 0, icon: '🛒', color: 'bg-purple-500' },
    { title: 'Available Tables', value: stats?.availableTables || 0, icon: '🪑', color: 'bg-green-600' },
    { title: 'Occupied Tables', value: stats?.occupiedTables || 0, icon: '👥', color: 'bg-red-500' },
    { title: 'Bill Requested', value: stats?.billRequestedTables || 0, icon: '🔔', color: 'bg-orange-500' },
    { title: 'Total Tables', value: stats?.totalTables || 0, icon: '🏢', color: 'bg-gray-600' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <button
          onClick={fetchDashboardData}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center space-x-2"
        >
          <span>🔄</span>
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              </div>
              <div className={`${card.color} w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-700 font-medium">Table Occupancy Rate</span>
            <span className="text-primary-600 font-bold">
              {stats?.totalTables > 0 
                ? ((stats.occupiedTables / stats.totalTables) * 100).toFixed(1) 
                : '0'}%
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-700 font-medium">Bill Payment Rate</span>
            <span className="text-green-600 font-bold">
              {(stats?.paidBills + stats?.pendingBills) > 0 
                ? ((stats.paidBills / (stats.paidBills + stats.pendingBills)) * 100).toFixed(1) 
                : '0'}%
            </span>
          </div>
        </div>
      </div>

      {/* Pending Bills Alert */}
      {stats?.pendingBillsAlerts && stats.pendingBillsAlerts.length > 0 && (
        <div className="mt-8 bg-red-50 border-2 border-red-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
            <span className="mr-2">⚠️</span>
            Pending Bills Alert ({stats.pendingBillsAlerts.length})
          </h3>
          <p className="text-red-700 mb-4">These bills have been pending for more than 30 minutes</p>
          <div className="space-y-2">
            {stats.pendingBillsAlerts.map((bill) => {
              const minutesPending = Math.floor((Date.now() - new Date(bill.createdAt)) / (1000 * 60));
              return (
                <div key={bill._id} className="bg-white p-4 rounded-lg border border-red-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">Table {bill.table?.tableNumber}</p>
                      <p className="text-sm text-gray-600">Bill #{bill._id.slice(-6)} - ${bill.total?.toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-red-600 font-bold">{minutesPending} mins pending</p>
                      <p className="text-xs text-gray-500">{new Date(bill.createdAt).toLocaleTimeString()}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
