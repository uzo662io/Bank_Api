const db = require('../config/db');

const createTransferTable = `
  CREATE TABLE IF NOT EXISTS transfers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    from_account_id INT NOT NULL,
    to_account_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (from_account_id) REFERENCES accounts(id),
    FOREIGN KEY (to_account_id) REFERENCES accounts(id)
  )
`;

db.query(createTransferTable, (err, results) => {
  if (err) {
    console.error('Error creating transfer table:', err);
  } else {
    console.log('Transfer table created or already exists.');
  }
});

module.exports = db;