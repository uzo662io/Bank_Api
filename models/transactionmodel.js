const db = require('../config/db');

const createTransactionTable = `
  CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT NOT NULL,
    type ENUM('deposit', 'withdrawal', 'transfer', 'bill_payment') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id)
  )
`;

db.query(createTransactionTable, (err, results) => {
  if (err) {
    console.error('Error creating transaction table:', err);
  } else {
    console.log('Transaction table created or already exists.');
  }
});

module.exports = db;