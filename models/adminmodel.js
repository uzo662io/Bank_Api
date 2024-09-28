const db = require('../config/db');

const createAdminTable = `
  CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

db.query(createAdminTable, (err, results) => {
  if (err) {
    console.error('Error creating admin table:', err);
  } else {
    console.log('Admin table created or already exists.');
  }
});

module.exports = db;