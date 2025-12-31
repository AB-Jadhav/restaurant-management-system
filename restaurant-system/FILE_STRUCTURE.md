# Restaurant Management System - Complete File Structure

```
restaurant-system/
│
├── 📄 README.md                          # Complete documentation
├── 📄 QUICKSTART.md                      # 5-minute setup guide
├── 📄 PROJECT_SUMMARY.md                 # Project completion summary
├── 📄 install.sh                         # Linux/Mac installation script
├── 📄 install.bat                        # Windows installation script
│
├── backend/                               # Node.js + Express Backend
│   │
│   ├── config/
│   │   └── database.js                   # MongoDB connection configuration
│   │
│   ├── controllers/                      # Business logic
│   │   ├── authController.js            # Login, register, authentication
│   │   ├── tableController.js           # Table CRUD operations
│   │   ├── menuController.js            # Menu item management
│   │   ├── orderController.js           # Order management
│   │   └── billController.js            # Billing operations
│   │
│   ├── middleware/
│   │   ├── auth.js                      # JWT verification & authorization
│   │   └── errorHandler.js              # Global error handling
│   │
│   ├── models/                          # MongoDB Schemas
│   │   ├── User.js                      # User model (Manager/Cashier/Waiter)
│   │   ├── Table.js                     # Table model with status
│   │   ├── MenuItem.js                  # Menu item model
│   │   ├── Order.js                     # Order with embedded items
│   │   └── Bill.js                      # Bill with payment tracking
│   │
│   ├── routes/                          # API Endpoints
│   │   ├── authRoutes.js                # /api/auth/* (login, register)
│   │   ├── tableRoutes.js               # /api/tables/* (CRUD)
│   │   ├── menuRoutes.js                # /api/menu/* (CRUD)
│   │   ├── orderRoutes.js               # /api/orders/* (CRUD)
│   │   └── billRoutes.js                # /api/bills/* (CRUD)
│   │
│   ├── jobs/
│   │   └── backgroundJobs.js            # Cron jobs (email alerts, auto-cleanup)
│   │
│   ├── utils/
│   │   └── emailService.js              # Email notification service
│   │
│   ├── .env.example                     # Environment variables template
│   ├── .env                             # Environment configuration (created)
│   ├── .gitignore                       # Git ignore rules
│   ├── package.json                     # Dependencies & scripts
│   ├── seed.js                          # Database seeding script
│   └── server.js                        # Express server entry point
│
└── frontend/                            # React Frontend
    │
    ├── public/
    │   └── index.html                   # HTML template
    │
    ├── src/
    │   │
    │   ├── components/                  # Reusable components
    │   │   ├── Layout.js               # Main layout with header & nav
    │   │   └── PrivateRoute.js         # Protected route wrapper
    │   │
    │   ├── context/
    │   │   └── AuthContext.js          # Authentication state management
    │   │
    │   ├── pages/                      # Main application pages
    │   │   ├── Login.js                # Login page with demo credentials
    │   │   ├── Dashboard.js            # Statistics dashboard
    │   │   ├── Tables.js               # Table management page
    │   │   ├── Menu.js                 # Menu management page
    │   │   ├── Orders.js               # Order management page
    │   │   └── Bills.js                # Billing page
    │   │
    │   ├── services/
    │   │   ├── api.js                  # Axios configuration
    │   │   └── index.js                # API service functions
    │   │
    │   ├── App.js                      # Main app component with routes
    │   ├── index.js                    # React entry point
    │   └── index.css                   # Global styles + Tailwind
    │
    ├── .env                            # Frontend environment variables
    ├── .gitignore                      # Git ignore rules
    ├── package.json                    # Dependencies & scripts
    ├── tailwind.config.js              # Tailwind CSS configuration
    └── postcss.config.js               # PostCSS configuration

```

## 📊 Statistics

### Backend
- **Models**: 5 (User, Table, MenuItem, Order, Bill)
- **Controllers**: 5 (Auth, Table, Menu, Order, Bill)
- **Routes**: 5 files
- **Middleware**: 2 (Auth, Error Handler)
- **API Endpoints**: 25+
- **Background Jobs**: 2 (Email alerts, Auto-cleanup)
- **Lines of Code**: ~2,500+

### Frontend
- **Pages**: 6 (Login, Dashboard, Tables, Menu, Orders, Bills)
- **Components**: 2 (Layout, PrivateRoute)
- **Context**: 1 (Auth)
- **Services**: Complete API integration
- **Lines of Code**: ~2,000+

### Documentation
- **README.md**: Comprehensive guide (~400 lines)
- **QUICKSTART.md**: Quick setup guide
- **PROJECT_SUMMARY.md**: Implementation summary
- **Installation Scripts**: Windows & Linux/Mac

### Total Project
- **Total Files**: 40+
- **Total Lines of Code**: ~5,000+
- **Dependencies**: 20+ packages
- **Estimated Development Time**: 20+ hours

## 🎯 Key Features by File

### Backend

**server.js**
- Express app initialization
- Middleware setup (CORS, JSON parsing)
- Route mounting
- Database connection
- Background job initialization
- Server startup

**models/User.js**
- User schema with roles
- Password hashing (bcryptjs)
- Password comparison method
- Timestamps

**models/Table.js**
- Table schema with status tracking
- Occupancy timestamps
- Waiter assignment
- Current order reference

**models/MenuItem.js**
- Menu item schema
- Category enum
- Price and preparation time
- Availability flag

**models/Order.js**
- Order schema with embedded items
- Automatic total calculation
- Tax computation (10%)
- Item status tracking

**models/Bill.js**
- Bill schema
- Payment method tracking
- Payment timestamps
- Status tracking (pending/paid)

**controllers/authController.js**
- User registration
- User login with JWT
- Get current user
- Token generation

**controllers/tableController.js**
- Get all tables
- Create table (Manager only)
- Update table status
- Delete table

**controllers/menuController.js**
- Get menu items with filters
- Create menu item (Manager)
- Update menu item
- Delete menu item

**controllers/orderController.js**
- Create order
- Add items to order
- Update item status
- Complete order

**controllers/billController.js**
- Generate bill
- Process payment
- Get bill statistics
- Bill history

**middleware/auth.js**
- JWT token verification
- Role-based authorization
- User extraction from token

**jobs/backgroundJobs.js**
- Check pending bills (every 15 min)
- Send email alerts
- Auto-close tables (hourly)

**utils/emailService.js**
- Email transporter setup
- Bill request notifications
- Pending bill alerts

### Frontend

**App.js**
- Router setup
- Route configuration
- Auth provider wrapper
- Toast container

**pages/Login.js**
- Login form
- Demo credentials display
- Authentication handling
- Responsive design

**pages/Dashboard.js**
- Real-time statistics
- Revenue tracking
- Table occupancy
- Auto-refresh (30s)

**pages/Tables.js**
- Table grid view
- Status management
- Create new tables
- Real-time updates

**pages/Menu.js**
- Menu items display
- Category filtering
- CRUD operations (Manager)
- Responsive cards

**pages/Orders.js**
- Order list
- Create new orders
- Add items to orders
- Order details

**pages/Bills.js**
- Bill list with filters
- Generate bills
- Process payments
- Payment methods

**components/Layout.js**
- Header with user info
- Navigation menu
- Role-based nav items
- Logout functionality

**components/PrivateRoute.js**
- Route protection
- Role checking
- Loading state
- Redirect to login

**context/AuthContext.js**
- Authentication state
- Login/logout functions
- User persistence
- Context provider

**services/api.js**
- Axios instance
- Request interceptor (add token)
- Response interceptor (handle 401)
- Base URL configuration

**services/index.js**
- Auth service methods
- Table service methods
- Menu service methods
- Order service methods
- Bill service methods

## 🔌 API Endpoints Map

### Authentication (`/api/auth`)
```
POST   /register     - Register new user
POST   /login        - Login user
GET    /me           - Get current user (Protected)
```

### Tables (`/api/tables`)
```
GET    /             - Get all tables (Protected)
POST   /             - Create table (Manager)
GET    /:id          - Get single table (Protected)
PUT    /:id/status   - Update table status (Protected)
DELETE /:id          - Delete table (Manager)
```

### Menu (`/api/menu`)
```
GET    /             - Get all menu items (Protected)
POST   /             - Create menu item (Manager)
GET    /:id          - Get single item (Protected)
PUT    /:id          - Update item (Manager)
DELETE /:id          - Delete item (Manager)
```

### Orders (`/api/orders`)
```
GET    /                      - Get all orders (Protected)
POST   /                      - Create order (Waiter)
GET    /:id                   - Get single order (Protected)
POST   /:id/items             - Add items (Waiter)
PUT    /:orderId/items/:itemId - Update item status
PUT    /:id/status            - Update order status
DELETE /:id                   - Delete order (Manager)
```

### Bills (`/api/bills`)
```
GET    /             - Get all bills (Protected)
GET    /stats        - Get bill statistics (Manager)
POST   /             - Generate bill (Waiter/Cashier)
GET    /:id          - Get single bill (Protected)
PUT    /:id/pay      - Process payment (Cashier)
```

## 🎨 UI Component Tree

```
App
├── Router
│   ├── Login (Public)
│   └── PrivateRoutes
│       ├── Layout
│       │   ├── Header
│       │   ├── Navigation
│       │   └── Content
│       │       ├── Dashboard
│       │       │   ├── StatCards
│       │       │   └── QuickStats
│       │       ├── Tables
│       │       │   ├── TableGrid
│       │       │   ├── TableCard
│       │       │   └── AddTableModal
│       │       ├── Menu
│       │       │   ├── CategoryFilter
│       │       │   ├── MenuGrid
│       │       │   ├── MenuCard
│       │       │   └── AddEditModal
│       │       ├── Orders
│       │       │   ├── OrdersList
│       │       │   ├── OrderCard
│       │       │   └── CreateOrderModal
│       │       └── Bills
│       │           ├── FilterButtons
│       │           ├── BillsList
│       │           ├── BillCard
│       │           ├── GenerateBillModal
│       │           └── PaymentModal
│       └── AuthContext Provider
└── ToastContainer
```

## 💾 Database Schema Relationships

```
User
├── role: manager/cashier/waiter
└── isActive: boolean

Table
├── tableNumber: unique
├── status: available/occupied/bill_requested/closed
├── currentOrder → Order (ref)
└── assignedWaiter → User (ref)

MenuItem
├── name: string
├── category: enum
├── price: number
└── isAvailable: boolean

Order
├── table → Table (ref)
├── waiter → User (ref)
├── items: [OrderItem]
│   ├── menuItem → MenuItem (ref)
│   ├── quantity: number
│   └── status: pending/preparing/ready/served
├── subtotal: calculated
├── tax: 10%
└── total: calculated

Bill
├── order → Order (ref)
├── table → Table (ref)
├── generatedBy → User (ref)
├── paidBy → User (ref)
├── status: pending/paid
└── paymentMethod: cash/card/upi/other
```

## 🚀 Startup Sequence

1. **MongoDB**: Database server running
2. **Backend Server** (Port 5000)
   - Connect to MongoDB
   - Load environment variables
   - Initialize Express app
   - Mount middleware
   - Register routes
   - Start background jobs
   - Listen on port 5000

3. **Frontend Server** (Port 3000)
   - Load React app
   - Initialize AuthContext
   - Setup React Router
   - Render Login or Dashboard
   - Connect to backend API

## 📦 Installation Commands

```bash
# Backend
cd backend
npm install
npm run seed
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm start
```

---

**Complete Full-Stack MERN Application** ✅
Built with best practices and production-ready code!
