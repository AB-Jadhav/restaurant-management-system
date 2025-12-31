# Restaurant Management System - Complete Feature Testing Guide

## 🎯 All Features Overview

### ✅ 1. Table Management
- **Track table status**: Available → Occupied → Bill Requested → Closed → Available (auto-closes after 1 hour)
- **Assign tables to waiters**
- **View current orders per table**
- **Real-time status updates**

### ✅ 2. Menu & Orders Management
- **Create orders** and **assign to tables**
- **Manage order items** (add menu items with quantities, notes)
- **Track order lifecycle**: Active → Completed → Cancelled
- **Track individual item status**: Pending → Preparing → Ready → Served
- **Automatic calculation**: Subtotal + 10% Tax = Total

### ✅ 3. Billing System
- **Generate bills** from active orders
- **Show total amount breakdown**: Subtotal, Tax (10%), Total
- **Mark bills as paid** with payment method selection (Cash/Card/UPI/Other)
- **Filter bills**: All, Pending, Paid

### ✅ 4. Role-Based Access Control
- **Waiter**: Create orders, add items, generate bills, update order status
- **Cashier**: Process payments, mark bills as paid
- **Manager**: Full access to all features + stats + delete operations

### ✅ 5. Notifications & Background Processes
- **Pending bill alerts**: Email notifications for bills pending > 30 minutes (runs every 15 mins)
- **Auto-closing tables**: Tables in "closed" status auto-reset to "available" after 1 hour (runs hourly)
- **Dashboard alerts**: Real-time visual alerts for pending bills > 30 minutes
- **Email notifications**: Bill requests to managers (optional, works without email config)

---

## 🧪 Complete Testing Workflow

### Prerequisites
```bash
# 1. Start Backend (Terminal 1)
cd restaurant-system/backend
npm start

# 2. Start Frontend (Terminal 2)
cd restaurant-system/frontend
npm start

# 3. Open browser: http://localhost:3000
```

### Test Users (from seed data)
| Username | Password | Role | Email |
|----------|----------|------|-------|
| `waiter` | `waiter123` | Waiter | waiter@restaurant.com |
| `cashier` | `cashier123` | Cashier | cashier@restaurant.com |
| `manager` | `manager123` | Manager | manager@restaurant.com |

---

## 📋 Step-by-Step Testing

### Test 1: Table Management Flow (As Waiter)
1. **Login** as `waiter / waiter123`
2. Go to **Tables** page
3. Find an "Available" table (e.g., Table 1)
4. Click **"Assign to Me"** button
   - ✅ Status changes to **"Occupied"**
   - ✅ Shows "Assigned to: waiter"

### Test 2: Create Order & Menu Items (As Waiter)
1. Go to **Orders** page
2. Click **"+ New Order"** button
3. **Select Table**: Choose Table 1 (occupied)
4. **Add Items**:
   - Click "+ Add Item"
   - Select "Pasta Carbonara" - Qty: 2
   - Click "+ Add Item" again
   - Select "Caesar Salad" - Qty: 1
   - Add optional notes: "No onions in salad"
5. Click **"Create Order"**
   - ✅ Order appears in list
   - ✅ Shows subtotal, tax (10%), and total
   - ✅ Table status remains "occupied"
   - ✅ All items show status: "pending"

### Test 3: Track Order Item Lifecycle (As Waiter)
1. In **Orders** page, find the order you just created
2. For each item, you'll see a dropdown with status:
   - Change "Pasta Carbonara" status: **Pending → Preparing**
   - Change "Pasta Carbonara" status: **Preparing → Ready**
   - Change "Pasta Carbonara" status: **Ready → Served**
   - Change "Caesar Salad" status: **Pending → Preparing → Ready → Served**
   - ✅ Status updates immediately
   - ✅ Toast notification confirms each change

### Test 4: Generate Bill (As Waiter)
1. Go to **Bills** page
2. Click **"+ Generate Bill"** button
3. Select the order for Table 1
4. Click **"Generate Bill"**
   - ✅ Bill appears with status "⏳ Pending"
   - ✅ Shows breakdown: Subtotal, Tax (10%), Total
   - ✅ Shows all order items
5. Go back to **Tables** page
   - ✅ Table 1 status changed to **"Bill Requested"**

### Test 5: Process Payment (As Cashier)
1. **Logout** and login as `cashier / cashier123`
2. Go to **Bills** page
3. Find the pending bill for Table 1
4. Click **"💳 Process Payment"** button
5. Select payment method: **Card**
6. Click **"Confirm Payment"**
   - ✅ Bill status changes to **"✅ Paid"**
   - ✅ Shows payment method and paid timestamp
7. Go to **Tables** page
   - ✅ Table 1 status changed to **"Closed"**
   - ✅ No longer has assigned waiter or current order

### Test 6: Role-Based Permissions
**As Waiter:**
- ✅ Can create orders
- ✅ Can generate bills
- ❌ Cannot process payments (button hidden)
- ❌ Cannot delete tables/menu items

**As Cashier:**
- ✅ Can process payments
- ❌ Cannot create orders (button hidden)
- ❌ Cannot delete operations

**As Manager:**
- ✅ Can do everything
- ✅ Can delete tables, menu items, orders
- ✅ Can view bill statistics

### Test 7: Dashboard & Notifications (As Manager)
1. **Login** as `manager / manager123`
2. Go to **Dashboard**
3. View real-time stats:
   - ✅ Total Revenue
   - ✅ Pending Bills count
   - ✅ Paid Bills count
   - ✅ Active Orders count
   - ✅ Table occupancy stats
   - ✅ Bill payment rate

**Test Pending Bill Alerts:**
1. Create an order and generate a bill
2. **Wait 30+ minutes** (or modify bill createdAt in MongoDB for testing)
3. Go to **Dashboard**
   - ✅ See red alert box: "⚠️ Pending Bills Alert"
   - ✅ Shows table number, bill amount, minutes pending

### Test 8: Background Jobs

#### Pending Bill Email Alerts (every 15 minutes)
1. Check backend terminal logs every 15 minutes:
   ```
   Running pending bill check...
   Alert sent for table 5
   ```
2. If email is configured in `.env`, manager receives email
3. If email NOT configured: log shows "Email notification failed" (system continues working)

#### Auto-Close Tables (every hour)
1. Go to **Tables** page
2. Manually close a table (or wait for bill payment)
3. **Wait 1 hour** (or check backend logs)
4. Backend terminal shows:
   ```
   Running auto-close table check...
   Auto-closed 1 tables
   ```
5. Go to **Tables** page
   - ✅ Previously "closed" tables are now **"Available"**
   - ✅ Assigned waiter cleared
   - ✅ Ready for new orders

### Test 9: Menu Management (As Manager)
1. Go to **Menu** page
2. Click **"+ Add Menu Item"**
3. Fill details:
   - Name: "Special Pizza"
   - Description: "Chef's special with extra cheese"
   - Category: Main Course
   - Price: $19.99
   - Prep Time: 25 minutes
4. Click **"Add Item"**
   - ✅ Item appears in list
5. Click **Edit** button on any item
   - ✅ Can update details
6. Toggle **Availability** switch
   - ✅ Unavailable items can't be added to orders

### Test 10: Order Status Changes (As Waiter/Manager)
1. Go to **Orders** page
2. Find an active order
3. In the order header, use the **status dropdown**:
   - Change from "Active" to "Completed"
   - ✅ Order status updates
   - ✅ Can no longer modify item statuses
4. Create a new order and change to "Cancelled"
   - ✅ Order marked as cancelled

---

## 🔍 Verification Checklist

### ✅ Table Management
- [x] Tables show correct status (Available/Occupied/Bill Requested/Closed)
- [x] Waiter can assign available tables
- [x] Table status updates when order created
- [x] Table status updates when bill generated
- [x] Table status updates when bill paid
- [x] Closed tables auto-reset after 1 hour

### ✅ Menu & Orders
- [x] Waiter can create orders
- [x] Orders are assigned to selected tables
- [x] Menu items are properly added with quantities
- [x] Subtotal, tax (10%), and total calculated correctly
- [x] Individual item status can be updated (Pending/Preparing/Ready/Served)
- [x] Order status can be changed (Active/Completed/Cancelled)
- [x] Order notes are saved and displayed

### ✅ Billing
- [x] Bills can be generated from active orders
- [x] Bill shows complete breakdown (Subtotal + Tax + Total)
- [x] Bill shows all order items with details
- [x] Cashier/Manager can mark bills as paid
- [x] Payment method is recorded (Cash/Card/UPI/Other)
- [x] Paid bills show payment timestamp and user

### ✅ Role-Based Access
- [x] Waiter: Can create orders, generate bills
- [x] Waiter: Cannot process payments
- [x] Cashier: Can process payments
- [x] Cashier: Cannot create orders
- [x] Manager: Full access to all operations
- [x] Unauthorized operations show proper error messages

### ✅ Notifications & Background Jobs
- [x] Pending bill alerts shown on dashboard (> 30 mins)
- [x] Email notifications sent for pending bills (every 15 mins)
- [x] Auto-close tables after 1 hour (hourly job)
- [x] Background jobs run without crashing even if email not configured
- [x] Console logs show background job execution

---

## 🐛 Troubleshooting

### Orders not showing?
- Check if you're logged in as the correct role
- Refresh the page or click "🔄 Refresh" button
- Verify backend is running on port 5000

### Can't process payment?
- Login as `cashier` or `manager`
- Bill must be in "pending" status
- Check backend terminal for errors

### Background jobs not running?
- Check backend terminal for "Background jobs started successfully"
- Cron jobs run on schedule (15 mins for alerts, 1 hour for auto-close)
- Email errors won't stop the system

### Email notifications not working?
- This is OPTIONAL - system works without it
- Configure EMAIL_* variables in `backend/.env` to enable
- Use Gmail App Password (not regular password)

---

## 📊 Sample Test Data

After running `npm run seed` in backend:
- **12 tables** (2, 4, 6 seat capacity)
- **20 menu items** (appetizers, mains, desserts, beverages)
- **3 users** (waiter, cashier, manager)

All tables start as "Available"
All menu items are available by default

---

## 🎉 Success Criteria

Your system is working correctly if:
1. ✅ You can complete the full workflow: Login → Assign Table → Create Order → Track Items → Generate Bill → Process Payment
2. ✅ Each user role sees different options based on permissions
3. ✅ All calculations (subtotal, tax, total) are correct
4. ✅ Table statuses update automatically through the workflow
5. ✅ Dashboard shows real-time statistics
6. ✅ Pending bills > 30 mins show alerts
7. ✅ Background jobs run and log activity
8. ✅ System continues working even without email configuration

---

## 📝 Notes

- **Email notifications are OPTIONAL**: The system fully functions without email setup
- **Background jobs**: Check backend console for execution logs
- **Auto-refresh**: Dashboard refreshes every 30 seconds
- **Toast notifications**: Confirm every action (success/error)
- **MongoDB connection**: All data persists across restarts

---

**🚀 Your restaurant management system is production-ready with all required features!**
