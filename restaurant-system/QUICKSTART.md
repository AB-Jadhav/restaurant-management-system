# 🚀 Quick Start Guide

## Step-by-Step Setup (5 minutes)

### 1️⃣ Prerequisites Check
Make sure you have installed:
- Node.js (v14+): `node --version`
- MongoDB: `mongod --version`
- npm: `npm --version`

### 2️⃣ Start MongoDB
```bash
# Windows (if not running as service)
mongod

# Linux/Mac
sudo systemctl start mongod
# or
brew services start mongodb-community
```

### 3️⃣ Backend Setup
```bash
# Navigate to backend
cd backend

# Install dependencies (first time only)
npm install

# Create .env file
cp .env.example .env

# Edit .env and set at minimum:
# MONGODB_URI=mongodb://localhost:27017/restaurant-system
# JWT_SECRET=your_secret_key_here

# Seed database with demo data
npm run seed

# Start backend server
npm run dev
```

Backend will run on: **http://localhost:5000**

### 4️⃣ Frontend Setup (New Terminal)
```bash
# Navigate to frontend
cd frontend

# Install dependencies (first time only)
npm install

# Start frontend
npm start
```

Frontend will open automatically at: **http://localhost:3000**

### 5️⃣ Login and Test

Open browser at http://localhost:3000 and login with:

**Manager Account:**
- Username: `manager`
- Password: `manager123`
- Access: Full system access

**Cashier Account:**
- Username: `cashier`
- Password: `cashier123`
- Access: Bills and payments

**Waiter Account:**
- Username: `waiter`
- Password: `waiter123`
- Access: Tables and orders

## 🎯 Quick Test Workflow

### As Waiter:
1. Go to **Tables** → Click "Mark as Occupied" on Table 1
2. Go to **Orders** → Click "New Order"
3. Select Table 1, add some items, create order
4. Go back to **Tables** → Click "Request Bill" on Table 1

### As Cashier:
1. Go to **Bills** → You'll see the pending bill
2. Click "Process Payment"
3. Select payment method, confirm
4. Bill is now marked as paid!

### As Manager:
1. Go to **Dashboard** → See all statistics
2. Go to **Menu** → Add/Edit menu items
3. View all orders and bills

## 🔥 Troubleshooting

**MongoDB not connecting?**
```bash
# Check if MongoDB is running
mongosh
# or
mongo
```

**Port already in use?**
```bash
# Kill port 5000 (backend)
npx kill-port 5000

# Kill port 3000 (frontend)
npx kill-port 3000
```

**Dependencies issues?**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Want to reset data?**
```bash
cd backend
npm run seed
```

## 📱 Mobile Testing

The app is fully responsive! Test on:
- Chrome DevTools (F12 → Toggle Device Toolbar)
- Your mobile device (use your computer's IP address)

## 🎨 Features to Test

- ✅ Login/Logout
- ✅ Role-based access
- ✅ Table status management
- ✅ Create orders with multiple items
- ✅ Generate and pay bills
- ✅ Real-time dashboard updates
- ✅ Responsive design
- ✅ Menu CRUD operations (Manager)
- ✅ Order lifecycle tracking

## 🆘 Need Help?

Check the main README.md for:
- Complete API documentation
- Detailed feature explanations
- Architecture overview
- Security features

---

**Enjoy the application! 🎉**
