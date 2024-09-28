const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const transporter = require('../utils/nodemailer');
const logger = require('../utils/logger');

async function createUserProfile(req, res) {
  const { email, user_name, password, dob } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (email, user_name, password, dob) VALUES (?, ?, ?, ?)';
    db.query(query, [email, user_name, hashedPassword, dob], (err, results) => {
      if (err) {
        logger.error(`Error creating user profile: ${err.message}`);
        return res.status(500).json({ error: 'Internal server error' });
      }

      logger.info(`User profile created successfully for ${email}`);
      res.status(201).json({ message: 'User profile created successfully' });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Registration Successful',
        text: `Hello ${user_name},\n\nYour registration is successful.\n\nRegards,\nBank API Team`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          logger.error(`Error sending registration email: ${error.message}`);
        } else {
          logger.info(`Registration email sent: ${info.response}`);
        }
      });
    });
  } catch (error) {
    logger.error(`Error creating user profile: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
      if (err) {
        logger.error(`Error fetching user: ${err.message}`);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (results.length === 0) {
        logger.warn(`Invalid email or password for ${email}`);
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        logger.warn(`Invalid email or password for ${email}`);
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true });

      logger.info(`User logged in successfully: ${email}`);
      res.status(200).json({ message: 'Login successful' });
    });
  } catch (error) {
    logger.error(`Error logging in: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createUserProfile,
  login
};