const db = require('../config/db');

const createAccountTable = `
  CREATE TABLE IF NOT EXISTS accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    account_type VARCHAR(255) NOT NULL,
    balance DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`;

db.query(createAccountTable, (err, results) => {
  if (err) {
    console.error('Error creating account table:', err);
  } else {
    console.log('Account table created or already exists.');
  }
});

module.exports = db;