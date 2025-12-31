const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Send email notification
exports.sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      html: options.html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
};

// Bill request notification
exports.sendBillRequestNotification = async (tableNumber, waiterEmail, cashierEmail) => {
  const html = `
    <h2>Bill Request - Table ${tableNumber}</h2>
    <p>A customer at Table ${tableNumber} has requested their bill.</p>
    <p>Please process this request at your earliest convenience.</p>
    <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
  `;

  await this.sendEmail({
    to: `${waiterEmail}, ${cashierEmail}`,
    subject: `Bill Request - Table ${tableNumber}`,
    html
  });
};

// Pending bill alert
exports.sendPendingBillAlert = async (tableNumber, managerEmail, minutesPending) => {
  const html = `
    <h2>⚠️ Pending Bill Alert - Table ${tableNumber}</h2>
    <p>The bill for Table ${tableNumber} has been pending for ${minutesPending} minutes.</p>
    <p>Please follow up with the cashier to process this payment.</p>
    <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
  `;

  await this.sendEmail({
    to: managerEmail,
    subject: `⚠️ Pending Bill Alert - Table ${tableNumber}`,
    html
  });
};
