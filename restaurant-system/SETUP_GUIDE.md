# 📋 Step-by-Step Setup Guide

## Complete Installation & Configuration Guide for Restaurant Management System

This guide will walk you through every step needed to get the Restaurant Management System up and running on your local machine.

---

## 📑 Table of Contents

1. [Prerequisites Installation](#prerequisites-installation)
2. [Project Setup](#project-setup)
3. [Backend Configuration](#backend-configuration)
4. [Frontend Configuration](#frontend-configuration)
5. [Database Setup](#database-setup)
6. [Initial Data Seeding](#initial-data-seeding)
7. [Running the Application](#running-the-application)
8. [Testing the System](#testing-the-system)
9. [Common Issues & Solutions](#common-issues--solutions)

---

## 1️⃣ Prerequisites Installation

### Node.js Installation

**Windows:**
1. Visit https://nodejs.org/
2. Download the LTS version (v18.x or higher)
3. Run the installer and follow the prompts
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

**macOS:**
```bash
# Using Homebrew
brew install node

# Verify installation
node --version
npm --version
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### MongoDB Installation

**Option 1: Local MongoDB Installation**

**Windows:**
1. Visit https://www.mongodb.com/try/download/community
2. Download MongoDB Community Server
3. Run the installer and choose "Complete" installation
4. Install as a Windows Service
5. MongoDB Compass will be installed for GUI management

**macOS:**
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community@6.0

# Start MongoDB
brew services start mongodb-community@6.0
```

**Linux (Ubuntu):**
```bash
# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Create list file
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update and install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

**Option 2: MongoDB Atlas (Cloud Database - Recommended for beginners)**

1. Visit https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new cluster (free tier available)
4. Create a database user with username and password
5. Whitelist your IP address (or use 0.0.0.0/0 for development)
6. Get your connection string (it will look like):
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/restaurant-system?retryWrites=true&w=majority
   ```

### Git Installation (Optional)

**Windows:**
1. Download from https://git-scm.com/download/win
2. Run installer with default settings

**macOS:**
```bash
brew install git
```

**Linux:**
```bash
sudo apt-get install git
```

---

## 2️⃣ Project Setup

### Extract or Clone the Project

**If you have a ZIP file:**
```bash
# Extract the ZIP file to a location like:
# Windows: C:\Users\YourName\Projects\restaurant-system
# macOS/Linux: ~/Projects/restaurant-system
```

**If using Git:**
```bash
git clone <repository-url>
cd restaurant-system
```

### Project Structure Verification

Make sure your folder structure looks like this:
```
restaurant-system/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── jobs/
│   ├── package.json
│   ├── server.js
│   └── .env.example
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

---

## 3️⃣ Backend Configuration

### Step 1: Install Backend Dependencies

```bash
# Open terminal in project root
cd restaurant-system/backend

# Install all dependencies
npm install
```

**Expected output:**
```
added 150+ packages in 30s
```

### Step 2: Create Environment File

```bash
# Copy the example environment file
# Windows (PowerShell)
copy .env.example .env

# macOS/Linux
cp .env.example .env
```

### Step 3: Configure Environment Variables

Open the `.env` file in the `backend` folder and update these values:

```env
# Server Configuration
PORT=5000

# Database Configuration
# Option 1: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/restaurant-system

# Option 2: MongoDB Atlas (replace with your connection string)
# MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/restaurant-system?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_min_32_chars
JWT_EXPIRE=7d

# Email Configuration (Optional - for notifications)
# If you don't want email notifications, leave these as is
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
EMAIL_FROM=noreply@restaurant.com

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

**Important Notes:**
- Change `JWT_SECRET` to a random string (at least 32 characters)
- If using Gmail for emails, you need to create an "App Password" from Google Account settings
- Email configuration is optional; the system works without it

### Step 4: Verify Backend Setup

```bash
# Make sure you're in the backend directory
cd restaurant-system/backend

# Test if server starts
npm run dev
```

**Expected output:**
```
Server running on port 5000
MongoDB Connected: localhost
Background jobs initialized
```

Press `Ctrl+C` to stop the server (we'll start it again later).

---

## 4️⃣ Frontend Configuration

### Step 1: Install Frontend Dependencies

Open a **NEW terminal** (keep the backend terminal separate):

```bash
# Navigate to frontend directory
cd restaurant-system/frontend

# Install dependencies
npm install
```

**Expected output:**
```
added 1500+ packages in 60s
```

### Step 2: Configure Frontend Environment (Optional)

The frontend will automatically use `http://localhost:5000/api` for the backend.

If you need to change this, create a `.env` file in the `frontend` folder:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 3: Verify Frontend Setup

```bash
# Make sure you're in the frontend directory
cd restaurant-system/frontend

# Start development server
npm start
```

**Expected output:**
```
Compiled successfully!

You can now view restaurant-system in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.x:3000
```

Your browser should automatically open to `http://localhost:3000`.

Press `Ctrl+C` to stop the server (we'll start it properly in the next section).

---

## 5️⃣ Database Setup

### Verify MongoDB Connection

**For Local MongoDB:**
```bash
# Check if MongoDB is running
# Windows (PowerShell)
Get-Service MongoDB

# macOS
brew services list | grep mongodb

# Linux
sudo systemctl status mongod
```

**For MongoDB Atlas:**
- No local service needed
- Make sure your connection string is correct in the `.env` file
- Verify IP whitelist in MongoDB Atlas dashboard

---

## 6️⃣ Initial Data Seeding

### Method 1: Using the Seed Script (Recommended)

```bash
# Navigate to backend directory
cd restaurant-system/backend

# Run the seed script
node seed.js
```

**Expected output:**
```
✅ Database Connected
✅ Database Cleared
✅ Users Created: 3
✅ Menu Items Created: 12
✅ Tables Created: 10
✅ Seeding Completed Successfully!
```

This will create:
- 3 users (manager, cashier, waiter)
- 12 sample menu items
- 10 tables

### Method 2: Manual User Creation via API

If the seed script doesn't work, you can create users manually:

1. Start the backend server:
   ```bash
   cd restaurant-system/backend
   npm run dev
   ```

2. Use curl or Postman to create users:

**Create Manager:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "manager",
    "email": "manager@restaurant.com",
    "password": "manager123",
    "role": "manager"
  }'
```

**Create Cashier:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "cashier",
    "email": "cashier@restaurant.com",
    "password": "cashier123",
    "role": "cashier"
  }'
```

**Create Waiter:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "waiter",
    "email": "waiter@restaurant.com",
    "password": "waiter123",
    "role": "waiter"
  }'
```

---

## 7️⃣ Running the Application

### Start Both Servers

**Terminal 1 - Backend:**
```bash
cd restaurant-system/backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd restaurant-system/frontend
npm start
```

### Verify Everything is Running

1. Backend should be running at `http://localhost:5000`
2. Frontend should open automatically at `http://localhost:3000`
3. You should see the login page

---

## 8️⃣ Testing the System

### Login and Test Each Role

#### Test 1: Manager Login
1. Go to `http://localhost:3000`
2. Login with:
   - Username: `manager`
   - Password: `manager123`
3. You should see the dashboard with statistics
4. Navigate to **Menu** → Add a new menu item
5. Navigate to **Tables** → Add a new table
6. Verify all menu options are visible

#### Test 2: Waiter Workflow
1. Logout (click username → Logout)
2. Login with:
   - Username: `waiter`
   - Password: `waiter123`
3. Navigate to **Tables**
4. Click on a table → Click **Occupy Table**
5. Assign yourself as the waiter
6. Navigate to **Orders** → Click **Create New Order**
7. Select the table and add menu items
8. Go back to **Tables** → Click **Request Bill** for the table

#### Test 3: Cashier Workflow
1. Logout and login with:
   - Username: `cashier`
   - Password: `cashier123`
2. Navigate to **Bills**
3. You should see the pending bill from the waiter
4. Click **Pay Bill**
5. Select payment method (Cash, Card, UPI)
6. Confirm payment
7. Verify the bill is marked as paid
8. Check the dashboard for updated revenue

### Verify API Endpoints

Test the API directly:

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "manager",
    "password": "manager123"
  }'
```

**Get Tables (requires token from login response):**
```bash
curl -X GET http://localhost:5000/api/tables \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 9️⃣ Common Issues & Solutions

### Issue 1: MongoDB Connection Failed

**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solutions:**
1. Check if MongoDB is running:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

2. Verify connection string in `.env` file
3. For MongoDB Atlas: Check IP whitelist and credentials

### Issue 2: Port Already in Use

**Error:** `Port 5000 (or 3000) is already in use`

**Solutions:**
```bash
# Windows (PowerShell)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9

# Or use npx
npx kill-port 5000
npx kill-port 3000
```

### Issue 3: npm install fails

**Error:** `npm ERR! code EACCES` or permission errors

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and try again
rm -rf node_modules
npm install

# On Linux/macOS, don't use sudo with npm
```

### Issue 4: Frontend can't connect to Backend

**Error:** `Network Error` or `ERR_CONNECTION_REFUSED`

**Solutions:**
1. Make sure backend is running on port 5000
2. Check CORS settings in backend
3. Verify `REACT_APP_API_URL` in frontend (if set)
4. Clear browser cache and reload

### Issue 5: JWT Token errors

**Error:** `JsonWebTokenError` or `invalid token`

**Solutions:**
1. Make sure `JWT_SECRET` is set in backend `.env`
2. Clear browser localStorage:
   - Open browser console (F12)
   - Run: `localStorage.clear()`
   - Refresh page and login again

### Issue 6: Email notifications not working

**Solution:**
- Email is optional; the system works without it
- For Gmail: Enable 2-factor authentication and create an App Password
- Update `.env` with the App Password (not your regular password)

### Issue 7: Database seed script fails

**Solutions:**
```bash
# Make sure MongoDB is connected
# Try manually creating one user first via API
# Check backend console for specific error messages
```

### Issue 8: Tailwind CSS not working

**Error:** Styles not applying

**Solutions:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

---

## ✅ Verification Checklist

Before considering setup complete, verify:

- [ ] Backend server starts without errors
- [ ] Frontend loads in browser
- [ ] MongoDB connection successful
- [ ] Can login with manager account
- [ ] Can login with cashier account
- [ ] Can login with waiter account
- [ ] Dashboard displays statistics
- [ ] Can navigate to all pages (Tables, Menu, Orders, Bills)
- [ ] Can create a table (as manager)
- [ ] Can add menu items (as manager)
- [ ] Can create an order (as waiter)
- [ ] Can process a bill (as cashier)

---

## 🎓 Next Steps

1. **Explore the system** - Try all features with different roles
2. **Read the API documentation** - Check DEPLOYMENT.md for production setup
3. **Customize** - Modify colors, branding, or add features
4. **Deploy** - Follow DEPLOYMENT.md to deploy to production

---

## 🆘 Getting Help

If you encounter issues not covered here:

1. Check the main README.md for additional information
2. Review error messages in:
   - Backend terminal
   - Frontend terminal
   - Browser console (F12)
3. Check MongoDB logs
4. Verify all environment variables are set correctly

---

## 📞 Support

For technical issues:
- Check GitHub issues section
- Review the code comments
- Verify your setup matches this guide exactly

**Common Setup Time:**
- First-time setup: 30-45 minutes
- With experience: 10-15 minutes

---

**Happy Coding! 🚀**

