const db = require('../config/db');

const createDepositTable = `
  CREATE TABLE IF NOT EXISTS deposits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id)
  )
`;

db.query(createDepositTable, (err, results) => {
  if (err) {
    console.error('Error creating deposit table:', err);
  } else {
    console.log('Deposit table created or already exists.');
  }
});

module.exports = db;