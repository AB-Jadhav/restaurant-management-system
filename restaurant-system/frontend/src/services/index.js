import api from './api';

export const authService = {
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    if (response.data.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export const tableService = {
  getTables: async () => {
    const response = await api.get('/tables');
    return response.data;
  },

  getTable: async (id) => {
    const response = await api.get(`/tables/${id}`);
    return response.data;
  },

  createTable: async (tableData) => {
    const response = await api.post('/tables', tableData);
    return response.data;
  },

  updateTableStatus: async (id, status, assignedWaiter = null) => {
    const response = await api.put(`/tables/${id}/status`, { status, assignedWaiter });
    return response.data;
  },

  deleteTable: async (id) => {
    const response = await api.delete(`/tables/${id}`);
    return response.data;
  },
};

export const menuService = {
  getMenuItems: async (filters = {}) => {
    const response = await api.get('/menu', { params: filters });
    return response.data;
  },

  getMenuItem: async (id) => {
    const response = await api.get(`/menu/${id}`);
    return response.data;
  },

  createMenuItem: async (itemData) => {
    const response = await api.post('/menu', itemData);
    return response.data;
  },

  updateMenuItem: async (id, itemData) => {
    const response = await api.put(`/menu/${id}`, itemData);
    return response.data;
  },

  deleteMenuItem: async (id) => {
    const response = await api.delete(`/menu/${id}`);
    return response.data;
  },
};

export const orderService = {
  getOrders: async (filters = {}) => {
    const response = await api.get('/orders', { params: filters });
    return response.data;
  },

  getOrder: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  addOrderItems: async (id, items) => {
    const response = await api.post(`/orders/${id}/items`, { items });
    return response.data;
  },

  updateOrderItemStatus: async (orderId, itemId, status) => {
    const response = await api.put(`/orders/${orderId}/items/${itemId}`, { status });
    return response.data;
  },

  updateOrderStatus: async (id, status) => {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data;
  },
};

export const billService = {
  getBills: async (filters = {}) => {
    const response = await api.get('/bills', { params: filters });
    return response.data;
  },

  getBill: async (id) => {
    const response = await api.get(`/bills/${id}`);
    return response.data;
  },

  generateBill: async (orderId) => {
    const response = await api.post('/bills', { orderId });
    return response.data;
  },

  payBill: async (id, paymentMethod) => {
    const response = await api.put(`/bills/${id}/pay`, { paymentMethod });
    return response.data;
  },

  getBillStats: async () => {
    const response = await api.get('/bills/stats');
    return response.data;
  },
};
