const db = require('../config/db');

const createWithdrawalTable = `
  CREATE TABLE IF NOT EXISTS withdrawals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id)
  )
`;

db.query(createWithdrawalTable, (err, results) => {
  if (err) {
    console.error('Error creating withdrawal table:', err);
  } else {
    console.log('Withdrawal table created or already exists.');
  }
});

module.exports = db;