# 🍽️ Restaurant Live Table Order & Billing System

A full-stack MERN application for managing restaurant operations including table management, menu ordering, billing, and role-based access control.

![Tech Stack](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 📦 Repository Information

**Repository Name:** `restaurant-management-system`

**Recommended GitHub Repository Naming:**
- `restaurant-management-system`
- `mern-restaurant-pos`
- `table-order-billing-system`

## 🔑 Demo Credentials

| Role | Username | Password | Access Level |
|------|----------|----------|-------------|
| 👔 **Manager** | `manager` | `manager123` | Full system access, menu management, statistics |
| 💵 **Cashier** | `cashier` | `cashier123` | Bill processing, payment management |
| 🍽️ **Waiter** | `waiter` | `waiter123` | Table & order management |

## ✨ Features

### 🪑 Table Management
- Track table status: **Available**, **Occupied**, **Bill Requested**, **Closed**
- Assign waiters to tables
- Real-time table occupancy tracking
- Automatic table cleanup after closure

### 📋 Menu Management
- Add, edit, and delete menu items
- Categorize items (Appetizers, Main Course, Desserts, Beverages)
- Track item availability and preparation time
- Filter menu by category

### 🛒 Order Management
- Create orders and assign to tables
- Add multiple items to orders
- Track order status and lifecycle
- Real-time order updates
- Calculate totals with automatic tax computation (10%)

### 💰 Billing System
- Generate bills from active orders
- Multiple payment methods (Cash, Card, UPI, Other)
- Track pending and paid bills
- Bill statistics and revenue tracking
- Automatic table status updates on payment

### 👥 Role-Based Access Control
- **Waiter**: Manage tables, create orders, view menu
- **Cashier**: Process bills, view orders, manage payments
- **Manager**: Full access including menu management, statistics, and system configuration

### 🔔 Notification System
- Email alerts when bills are requested
- Pending bill notifications for management
- Auto-closing of tables after extended closure
- Background jobs for system maintenance

### 🎨 Responsive UI
- Modern, attractive design with Tailwind CSS
- Mobile-first responsive layout
- Real-time data refresh
- Interactive dashboards with statistics
- Toast notifications for user feedback

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**

### Installation

#### 1. Clone or Navigate to Project Directory

```bash
cd restaurant-system
```

#### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env file with your configuration
# Set your MongoDB URI, JWT secret, and email credentials
```

**Edit `.env` file:**

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/restaurant-system
JWT_SECRET=your_secure_jwt_secret_key
JWT_EXPIRE=7d

# Email Configuration (Optional - for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@restaurant.com

FRONTEND_URL=http://localhost:3000
```

#### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install
```

### 🗄️ Database Setup

Make sure MongoDB is running on your system:

```bash
# Start MongoDB (if not running as a service)
mongod
```

The application will automatically create the database and collections on first run.

### 🎬 Running the Application

#### Start Backend Server

```bash
cd backend
npm run dev
# Server will run on http://localhost:5000
```

#### Start Frontend Development Server

Open a new terminal:

```bash
cd frontend
npm start
# Application will open at http://localhost:3000
```

## 👤 Demo Accounts

To get started quickly, create these demo users:

### Using the API (with Postman or curl):

```bash
# Create Manager Account
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "manager",
  "email": "manager@restaurant.com",
  "password": "manager123",
  "role": "manager"
}

# Create Cashier Account
{
  "username": "cashier",
  "email": "cashier@restaurant.com",
  "password": "cashier123",
  "role": "cashier"
}

# Create Waiter Account
{
  "username": "waiter",
  "email": "waiter@restaurant.com",
  "password": "waiter123",
  "role": "waiter"
}
```

### Quick Setup Script

Create initial data by running these commands in your terminal:

```bash
# Navigate to backend directory
cd backend

# Create a seed script (optional)
node -e "
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  console.log('Creating demo users...');
  
  await User.create([
    { username: 'manager', email: 'manager@restaurant.com', password: 'manager123', role: 'manager' },
    { username: 'cashier', email: 'cashier@restaurant.com', password: 'cashier123', role: 'cashier' },
    { username: 'waiter', email: 'waiter@restaurant.com', password: 'waiter123', role: 'waiter' }
  ]);
  
  console.log('Demo users created successfully!');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
"
```

## 📱 Usage Guide

### 1. Login
- Open http://localhost:3000
- Use one of the demo accounts to login
- You'll be redirected to the dashboard

### 2. Manager Workflow
1. **Setup Menu**: Go to Menu → Add menu items
2. **Setup Tables**: Go to Tables → Add tables with capacity
3. **Monitor Dashboard**: View real-time statistics

### 3. Waiter Workflow
1. **Occupy Table**: Go to Tables → Mark table as occupied
2. **Create Order**: Go to Orders → Create new order for the table
3. **Add Items**: Select table and add menu items
4. **Request Bill**: When customer is done, mark table as "Bill Requested"

### 4. Cashier Workflow
1. **View Pending Bills**: Go to Bills → Filter by Pending
2. **Process Payment**: Select bill → Choose payment method → Confirm
3. **Monitor Revenue**: View dashboard for payment statistics

## 🏗️ Project Structure

```
restaurant-system/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── tableController.js   # Table management
│   │   ├── menuController.js    # Menu CRUD operations
│   │   ├── orderController.js   # Order management
│   │   └── billController.js    # Billing operations
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication
│   │   └── errorHandler.js      # Error handling
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Table.js             # Table schema
│   │   ├── MenuItem.js          # Menu item schema
│   │   ├── Order.js             # Order schema
│   │   └── Bill.js              # Bill schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   ├── tableRoutes.js       # Table endpoints
│   │   ├── menuRoutes.js        # Menu endpoints
│   │   ├── orderRoutes.js       # Order endpoints
│   │   └── billRoutes.js        # Bill endpoints
│   ├── jobs/
│   │   └── backgroundJobs.js    # Cron jobs
│   ├── utils/
│   │   └── emailService.js      # Email notifications
│   ├── .env.example             # Environment template
│   ├── package.json
│   └── server.js                # Entry point
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Layout.js        # Main layout with nav
    │   │   └── PrivateRoute.js  # Protected route wrapper
    │   ├── context/
    │   │   └── AuthContext.js   # Authentication context
    │   ├── pages/
    │   │   ├── Login.js         # Login page
    │   │   ├── Dashboard.js     # Statistics dashboard
    │   │   ├── Tables.js        # Table management
    │   │   ├── Menu.js          # Menu management
    │   │   ├── Orders.js        # Order management
    │   │   └── Bills.js         # Billing page
    │   ├── services/
    │   │   ├── api.js           # Axios configuration
    │   │   └── index.js         # API service methods
    │   ├── App.js               # Main app component
    │   ├── index.css            # Global styles
    │   └── index.js             # Entry point
    ├── .env
    ├── package.json
    ├── tailwind.config.js
    └── postcss.config.js
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Tables
- `GET /api/tables` - Get all tables
- `POST /api/tables` - Create table (Manager)
- `GET /api/tables/:id` - Get single table
- `PUT /api/tables/:id/status` - Update table status
- `DELETE /api/tables/:id` - Delete table (Manager)

### Menu
- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Create menu item (Manager)
- `GET /api/menu/:id` - Get single menu item
- `PUT /api/menu/:id` - Update menu item (Manager)
- `DELETE /api/menu/:id` - Delete menu item (Manager)

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create order (Waiter)
- `GET /api/orders/:id` - Get single order
- `POST /api/orders/:id/items` - Add items to order
- `PUT /api/orders/:id/status` - Update order status

### Bills
- `GET /api/bills` - Get all bills
- `POST /api/bills` - Generate bill
- `GET /api/bills/:id` - Get single bill
- `PUT /api/bills/:id/pay` - Mark bill as paid (Cashier)
- `GET /api/bills/stats` - Get bill statistics (Manager)

## 🔧 Technologies Used

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Nodemailer** - Email notifications
- **node-cron** - Scheduled tasks

### Frontend
- **React** - UI framework
- **React Router** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **React Toastify** - Notifications

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control
- Protected API routes
- Input validation
- CORS enabled

## 🎯 Key Features Implementation

### Background Jobs
- **Pending Bill Alerts**: Runs every 15 minutes to check bills pending > 30 minutes
- **Auto-close Tables**: Runs hourly to clean up tables closed > 1 hour

### Real-time Updates
- Dashboard auto-refreshes every 30 seconds
- Manual refresh buttons on all pages

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interface

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Make sure MongoDB is running
sudo systemctl status mongod

# Or start it
sudo systemctl start mongod
```

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
npx kill-port 5000

# Kill process on port 3000 (frontend)
npx kill-port 3000
```

### Email Notifications Not Working
- Email notifications are optional
- The system will continue to work without email configuration
- Check your email provider's SMTP settings
- For Gmail, use App Passwords (not your regular password)

## 📄 License

This project is created for educational and demonstration purposes.

## 👨‍💻 Author

Created as part of a Full Stack Developer assignment.

## 🙏 Acknowledgments

- Built with MERN stack
- UI inspired by modern restaurant management systems
- Icons and emojis for enhanced user experience

---

**Happy Coding! 🚀**

For issues or questions, please create an issue in the repository.
