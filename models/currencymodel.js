const db = require('../config/db');

const createCurrencyTable = `
  CREATE TABLE IF NOT EXISTS currencies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL
  )
`;

db.query(createCurrencyTable, (err, results) => {
  if (err) {
    console.error('Error creating currencies table:', err);
  } else {
    console.log('Currencies table created or already exists.');
  }
});

module.exports = db;