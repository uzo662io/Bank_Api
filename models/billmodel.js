const db = require('../config/db');

const createBillPaymentTable = `
  CREATE TABLE IF NOT EXISTS bill_payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT NOT NULL,
    bill_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id)
  )
`;

db.query(createBillPaymentTable, (err, results) => {
  if (err) {
    console.error('Error creating bill payment table:', err);
  } else {
    console.log('Bill payment table created or already exists.');
  }
});

module.exports = db;