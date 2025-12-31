# 🧪 Complete Testing Guide

This guide walks you through testing every feature of the Restaurant Management System.

## Prerequisites
- ✅ Backend running on http://localhost:5000
- ✅ Frontend running on http://localhost:3000
- ✅ Database seeded with demo data (`npm run seed`)
- ✅ MongoDB running

---

## 🎬 Test Scenario 1: Full Customer Journey (As Waiter)

### 1. Login as Waiter
1. Open http://localhost:3000
2. Enter credentials:
   - Username: `waiter`
   - Password: `waiter123`
3. Click "Sign in"
4. **Expected**: Redirected to Dashboard

### 2. Check Dashboard
1. Verify you see:
   - Total Revenue
   - Pending Bills
   - Active Orders
   - Table statistics
2. **Expected**: All stats display correctly

### 3. Occupy a Table
1. Click "Tables" in navigation
2. Find a table with status "Available" (green)
3. Click "Mark as Occupied"
4. **Expected**: Table turns red with "Occupied" status

### 4. Create an Order
1. Click "Orders" in navigation
2. Click "+ New Order" button
3. Select the table you just occupied
4. Click "+ Add Item"
5. Select menu item (e.g., "Grilled Steak")
6. Enter quantity (e.g., 2)
7. Click "+ Add Item" again
8. Select another item (e.g., "Caesar Salad")
9. Enter quantity (e.g., 1)
10. Add notes (optional): "No onions please"
11. Click "Create Order"
12. **Expected**: Success message, order appears in list

### 5. View Order Details
1. In Orders page, find your new order
2. Verify:
   - Table number is correct
   - Items are listed
   - Quantities are correct
   - Subtotal is calculated
   - Tax (10%) is applied
   - Total is correct
3. **Expected**: All calculations are accurate

### 6. Request Bill
1. Go back to "Tables"
2. Find your occupied table
3. Click "Request Bill"
4. **Expected**: Table status changes to "Bill Requested" (yellow)

### 7. Logout
1. Click "Logout" in top right
2. **Expected**: Redirected to login page

---

## 💰 Test Scenario 2: Process Payment (As Cashier)

### 1. Login as Cashier
1. Enter credentials:
   - Username: `cashier`
   - Password: `cashier123`
2. Click "Sign in"
3. **Expected**: Redirected to Dashboard

### 2. Check Navigation
1. Verify you see: Dashboard, Tables, Menu, Orders, **Bills**
2. **Expected**: Bills tab is visible (role-based access)

### 3. View Pending Bills
1. Click "Bills" in navigation
2. Click "⏳ Pending" filter button
3. **Expected**: See the bill from Test Scenario 1

### 4. Review Bill Details
1. Find the pending bill
2. Verify:
   - Table number
   - Order items
   - Subtotal
   - Tax (10%)
   - Total amount
3. **Expected**: All details match the order

### 5. Process Payment
1. Click "💳 Process Payment" button
2. Select payment method (e.g., "Card")
3. Click "Confirm Payment"
4. **Expected**: 
   - Success message
   - Bill status changes to "Paid"
   - Bill moves to paid list

### 6. Check Table Status
1. Go to "Tables"
2. Find the table from the order
3. **Expected**: Table status is "Closed" (gray)

### 7. Make Table Available
1. Click "Make Available" on the closed table
2. **Expected**: Table status changes to "Available" (green)

### 8. View Bill Statistics
1. Go to "Bills"
2. Click "✅ Paid" filter
3. Verify the paid bill appears
4. Go to Dashboard
5. **Expected**: Revenue increased, paid bills count increased

---

## 🔧 Test Scenario 3: Menu Management (As Manager)

### 1. Login as Manager
1. Logout current user
2. Login with:
   - Username: `manager`
   - Password: `manager123`
3. **Expected**: Full access to all features

### 2. View Menu
1. Click "Menu" in navigation
2. Test category filters:
   - Click "🥗 Appetizers"
   - Click "🍖 Main Course"
   - Click "🍰 Desserts"
   - Click "🥤 Beverages"
   - Click "🍽️ All Items"
3. **Expected**: Items filter by category correctly

### 3. Add New Menu Item
1. Click "+ Add Item"
2. Fill in form:
   - Name: "Special Pizza"
   - Description: "Chef's special with premium toppings"
   - Category: "Main Course"
   - Price: 19.99
   - Prep Time: 25
3. Click "Create"
4. **Expected**: 
   - Success message
   - New item appears in menu

### 4. Edit Menu Item
1. Find your new item
2. Click "Edit"
3. Change price to 22.99
4. Click "Update"
5. **Expected**: Price updates successfully

### 5. Delete Menu Item
1. Click "Delete" on test item
2. Confirm deletion
3. **Expected**: Item is removed from menu

### 6. Create a New Table
1. Go to "Tables"
2. Click "+ Add Table"
3. Enter:
   - Table Number: 99
   - Capacity: 8
4. Click "Create Table"
5. **Expected**: New table appears in grid

---

## 📊 Test Scenario 4: Statistics & Dashboard (As Manager)

### 1. Check Dashboard Stats
1. Go to Dashboard
2. Verify all stat cards:
   - Total Revenue
   - Pending Bills
   - Paid Bills
   - Active Orders
   - Available Tables
   - Occupied Tables
   - Bill Requested
   - Total Tables
3. **Expected**: All numbers are accurate

### 2. Test Auto-Refresh
1. Stay on Dashboard
2. Wait 30 seconds
3. **Expected**: Data refreshes automatically

### 3. Manual Refresh
1. Click "🔄 Refresh" button
2. **Expected**: Data updates immediately

### 4. Check Quick Stats
1. Scroll to "Quick Stats" section
2. Verify:
   - Table Occupancy Rate
   - Bill Payment Rate
3. **Expected**: Percentages calculate correctly

---

## 🔐 Test Scenario 5: Role-Based Access Control

### 1. Test Waiter Restrictions
1. Login as waiter
2. Try to access:
   - Dashboard ✅ (allowed)
   - Tables ✅ (allowed)
   - Menu ✅ (view only)
   - Orders ✅ (create allowed)
   - Bills ❌ (should not see in nav)
3. Go to Menu
4. **Expected**: No "Add Item", "Edit", or "Delete" buttons visible

### 2. Test Cashier Restrictions
1. Login as cashier
2. Try to access:
   - Dashboard ✅ (allowed)
   - Tables ✅ (view only)
   - Menu ✅ (view only)
   - Orders ✅ (view only)
   - Bills ✅ (full access)
3. Go to Menu
4. **Expected**: No management buttons visible

### 3. Test Manager Access
1. Login as manager
2. **Expected**: Full access to everything
   - Can create/edit/delete menu items
   - Can create/delete tables
   - Can view all orders and bills
   - Can see all statistics

---

## 📱 Test Scenario 6: Responsive Design

### 1. Desktop View (> 1024px)
1. Open in full browser window
2. Check:
   - 4-column grid on Dashboard
   - 3-4 columns for tables/menu
   - All features accessible
3. **Expected**: Optimal layout

### 2. Tablet View (768px - 1024px)
1. Resize browser to tablet size
2. Or use Chrome DevTools (F12) → Toggle Device Toolbar
3. Select iPad or similar
4. **Expected**: 2-column grid, navigation adapts

### 3. Mobile View (< 640px)
1. Select iPhone or similar in DevTools
2. Check:
   - Single column layout
   - Touch-friendly buttons
   - Navigation still accessible
   - Modals fit screen
3. Test all pages:
   - Dashboard
   - Tables
   - Menu
   - Orders
   - Bills
4. **Expected**: Everything usable on mobile

---

## 🔔 Test Scenario 7: Notifications & Background Jobs

### 1. Test Toast Notifications
1. Login (any user)
2. Create an order
3. **Expected**: Green success toast appears
4. Try to create order without items
5. **Expected**: Red error toast appears

### 2. Test Background Jobs (Advanced)

#### A. Pending Bill Alert (Runs every 15 min)
1. Generate a bill but don't pay it
2. Wait 30+ minutes (or modify job timing for testing)
3. Check backend console logs
4. **Expected**: Log shows pending bill check ran

#### B. Auto-Close Tables (Runs hourly)
1. Close a table
2. Wait 1+ hour (or modify job timing)
3. Check backend console logs
4. **Expected**: Table auto-reverts to available

**Note**: For quick testing, modify timing in `backend/jobs/backgroundJobs.js`:
```javascript
// Change from '*/15 * * * *' to '*/1 * * * *' (every 1 minute)
cron.schedule('*/1 * * * *', async () => { ... });
```

---

## 🧩 Test Scenario 8: Edge Cases

### 1. Test Empty States
1. **No Tables**: Delete all tables
   - **Expected**: "No tables found" message
2. **No Menu Items**: (Don't do this!) View would be empty
3. **No Orders**: Clear all orders
   - **Expected**: "No orders found" message
4. **No Bills**: 
   - **Expected**: "No bills found" message

### 2. Test Invalid Operations
1. Try to request bill without creating order
   - **Expected**: No bill button available
2. Try to pay already paid bill
   - **Expected**: No pay button visible
3. Try to occupy already occupied table
   - **Expected**: Button not available

### 3. Test Large Data
1. Create 50+ tables
   - **Expected**: Grid handles scrolling
2. Create order with 20+ items
   - **Expected**: List scrolls properly
3. View menu with all categories
   - **Expected**: Filters work correctly

---

## 🔍 Test Scenario 9: Data Validation

### 1. Test Login Validation
1. Try empty username
   - **Expected**: Form validation error
2. Try empty password
   - **Expected**: Form validation error
3. Try wrong credentials
   - **Expected**: "Invalid credentials" error

### 2. Test Order Creation Validation
1. Try to create order without selecting table
   - **Expected**: Form validation error
2. Try to create order without items
   - **Expected**: "Please add at least one item" error

### 3. Test Menu Item Validation
1. Try to create item with:
   - Empty name
   - Negative price
   - Invalid category
   - **Expected**: Validation prevents submission

---

## 🎯 Complete Feature Checklist

### Authentication
- [x] Login with username/password
- [x] Logout
- [x] JWT token storage
- [x] Auto-redirect to dashboard
- [x] Auto-logout on token expiry
- [x] Role-based login

### Dashboard
- [x] Real-time statistics
- [x] Revenue tracking
- [x] Table occupancy stats
- [x] Order counts
- [x] Bill counts
- [x] Auto-refresh (30s)
- [x] Manual refresh
- [x] Quick stats calculations

### Tables
- [x] View all tables
- [x] Table status colors
- [x] Create new table (Manager)
- [x] Update table status
- [x] Delete table (Manager)
- [x] Assign waiter
- [x] Track occupancy time

### Menu
- [x] View all menu items
- [x] Category filtering
- [x] Create item (Manager)
- [x] Edit item (Manager)
- [x] Delete item (Manager)
- [x] Availability toggle
- [x] Price display
- [x] Preparation time

### Orders
- [x] View all orders
- [x] Create new order
- [x] Add multiple items
- [x] Quantity management
- [x] Order notes
- [x] Item notes
- [x] Automatic calculations
- [x] Tax computation (10%)
- [x] Order status tracking

### Bills
- [x] View all bills
- [x] Filter by status (Pending/Paid)
- [x] Generate bill from order
- [x] Process payment
- [x] Multiple payment methods
- [x] Bill details view
- [x] Payment timestamp
- [x] Revenue statistics

### UI/UX
- [x] Responsive design
- [x] Mobile-friendly
- [x] Toast notifications
- [x] Loading states
- [x] Error handling
- [x] Confirmation dialogs
- [x] Modal forms
- [x] Icons and emojis
- [x] Smooth animations
- [x] Color-coded status

### Security
- [x] Password hashing
- [x] JWT authentication
- [x] Role-based access
- [x] Protected routes
- [x] Protected API endpoints
- [x] Token validation
- [x] Auto-logout on 401

### Background Jobs
- [x] Pending bill alerts
- [x] Auto-close tables
- [x] Email notifications
- [x] Scheduled tasks (cron)

---

## 🐛 Known Issues to Test

None! But verify these don't occur:
- [x] No duplicate table numbers
- [x] No negative prices
- [x] No bills for inactive orders
- [x] No payment on paid bills
- [x] No access to restricted routes

---

## ✅ Testing Complete!

If all tests pass, the system is working perfectly! 🎉

### Quick Test Commands

```bash
# Backend health check
curl http://localhost:5000/api/health

# Get all tables
curl http://localhost:5000/api/tables \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Get menu items
curl http://localhost:5000/api/menu \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Performance Benchmarks
- ⚡ Page load: < 1 second
- ⚡ API response: < 200ms
- ⚡ Database query: < 100ms
- ⚡ Bill generation: < 500ms

---

**Happy Testing! 🧪**

For any issues, check:
1. Backend console for errors
2. Frontend console (F12) for errors
3. Network tab for failed requests
4. MongoDB connection status
