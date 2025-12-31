const cron = require('node-cron');
const Bill = require('../models/Bill');
const Table = require('../models/Table');
const User = require('../models/User');
const { sendPendingBillAlert } = require('../utils/emailService');

// Background job to check for pending bills and send alerts
const startBackgroundJobs = () => {
  // Run every 15 minutes
  cron.schedule('*/15 * * * *', async () => {
    try {
      console.log('Running pending bill check...');
      
      // Find bills pending for more than 30 minutes
      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
      
      const pendingBills = await Bill.find({
        status: 'pending',
        createdAt: { $lt: thirtyMinutesAgo }
      }).populate('table');

      if (pendingBills.length > 0) {
        // Get manager email
        const manager = await User.findOne({ role: 'manager', isActive: true });
        
        if (manager && manager.email) {
          for (let bill of pendingBills) {
            const minutesPending = Math.floor((Date.now() - bill.createdAt) / (1000 * 60));
            
            try {
              await sendPendingBillAlert(
                bill.table.tableNumber,
                manager.email,
                minutesPending
              );
              console.log(`Alert sent for table ${bill.table.tableNumber}`);
            } catch (error) {
              console.error('Failed to send alert:', error.message);
            }
          }
        }
      }
    } catch (error) {
      console.error('Background job error:', error);
    }
  });

  // Auto-close tables that have been closed for more than 1 hour
  cron.schedule('0 * * * *', async () => {
    try {
      console.log('Running auto-close table check...');
      
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      
      const result = await Table.updateMany(
        {
          status: 'closed',
          closedAt: { $lt: oneHourAgo }
        },
        {
          $set: {
            status: 'available',
            closedAt: null,
            occupiedAt: null,
            currentOrder: null,
            assignedWaiter: null
          }
        }
      );

      if (result.modifiedCount > 0) {
        console.log(`Auto-closed ${result.modifiedCount} tables`);
      }
    } catch (error) {
      console.error('Auto-close job error:', error);
    }
  });

  console.log('Background jobs started successfully');
};

module.exports = startBackgroundJobs;
