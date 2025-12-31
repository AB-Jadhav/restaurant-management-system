require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Table = require('./models/Table');
const MenuItem = require('./models/MenuItem');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Table.deleteMany({});
    await MenuItem.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create users
    const users = await User.create([
      {
        username: 'manager',
        email: 'manager@restaurant.com',
        password: 'manager123',
        role: 'manager'
      },
      {
        username: 'cashier',
        email: 'cashier@restaurant.com',
        password: 'cashier123',
        role: 'cashier'
      },
      {
        username: 'waiter',
        email: 'waiter@restaurant.com',
        password: 'waiter123',
        role: 'waiter'
      }
    ]);
    console.log('👥 Created demo users');

    // Create tables
    const tables = [];
    for (let i = 1; i <= 12; i++) {
      tables.push({
        tableNumber: i,
        capacity: i % 3 === 0 ? 6 : i % 2 === 0 ? 4 : 2,
        status: 'available'
      });
    }
    await Table.create(tables);
    console.log('🪑 Created 12 tables');

    // Create menu items
    const menuItems = [
      // Appetizers
      {
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with parmesan and croutons',
        category: 'appetizer',
        price: 8.99,
        preparationTime: 10
      },
      {
        name: 'Garlic Bread',
        description: 'Toasted bread with garlic butter',
        category: 'appetizer',
        price: 5.99,
        preparationTime: 8
      },
      {
        name: 'Chicken Wings',
        description: 'Spicy buffalo wings with ranch dip',
        category: 'appetizer',
        price: 12.99,
        preparationTime: 15
      },
      {
        name: 'Spring Rolls',
        description: 'Crispy vegetable spring rolls',
        category: 'appetizer',
        price: 7.99,
        preparationTime: 12
      },

      // Main Course
      {
        name: 'Grilled Steak',
        description: 'Premium ribeye steak with vegetables',
        category: 'main_course',
        price: 28.99,
        preparationTime: 25
      },
      {
        name: 'Pasta Carbonara',
        description: 'Creamy pasta with bacon and parmesan',
        category: 'main_course',
        price: 16.99,
        preparationTime: 20
      },
      {
        name: 'Chicken Parmesan',
        description: 'Breaded chicken with marinara and mozzarella',
        category: 'main_course',
        price: 18.99,
        preparationTime: 22
      },
      {
        name: 'Grilled Salmon',
        description: 'Atlantic salmon with lemon butter sauce',
        category: 'main_course',
        price: 24.99,
        preparationTime: 20
      },
      {
        name: 'Vegetable Stir Fry',
        description: 'Mixed vegetables with tofu in teriyaki sauce',
        category: 'main_course',
        price: 14.99,
        preparationTime: 18
      },
      {
        name: 'Beef Burger',
        description: 'Angus beef burger with fries',
        category: 'main_course',
        price: 15.99,
        preparationTime: 15
      },

      // Desserts
      {
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with molten center',
        category: 'dessert',
        price: 8.99,
        preparationTime: 12
      },
      {
        name: 'Tiramisu',
        description: 'Classic Italian coffee-flavored dessert',
        category: 'dessert',
        price: 7.99,
        preparationTime: 5
      },
      {
        name: 'Cheesecake',
        description: 'New York style cheesecake with berry compote',
        category: 'dessert',
        price: 9.99,
        preparationTime: 5
      },
      {
        name: 'Ice Cream Sundae',
        description: 'Three scoops with toppings',
        category: 'dessert',
        price: 6.99,
        preparationTime: 5
      },

      // Beverages
      {
        name: 'Fresh Orange Juice',
        description: 'Freshly squeezed orange juice',
        category: 'beverage',
        price: 4.99,
        preparationTime: 5
      },
      {
        name: 'Coffee',
        description: 'Freshly brewed coffee',
        category: 'beverage',
        price: 3.99,
        preparationTime: 5
      },
      {
        name: 'Iced Tea',
        description: 'Refreshing iced tea with lemon',
        category: 'beverage',
        price: 3.49,
        preparationTime: 3
      },
      {
        name: 'Cappuccino',
        description: 'Espresso with steamed milk foam',
        category: 'beverage',
        price: 4.99,
        preparationTime: 7
      },
      {
        name: 'Soft Drink',
        description: 'Choice of cola, sprite, or fanta',
        category: 'beverage',
        price: 2.99,
        preparationTime: 2
      },
      {
        name: 'Mineral Water',
        description: 'Bottled mineral water',
        category: 'beverage',
        price: 1.99,
        preparationTime: 1
      }
    ];

    await MenuItem.create(menuItems);
    console.log('📋 Created 20 menu items');

    console.log('\n✨ Database seeded successfully!\n');
    console.log('Demo Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Manager: manager / manager123');
    console.log('Cashier: cashier / cashier123');
    console.log('Waiter:  waiter / waiter123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
