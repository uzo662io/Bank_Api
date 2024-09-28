const db = require('../config/db');

const createUserTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    user_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

db.query(createUserTable, (err, results) => {
  if (err) {
    console.error('Error creating user table:', err);
  } else {
    console.log('User table created or already exists.');
  }
});

module.exports = db;