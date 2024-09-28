const Admin = require('../models/Admin');
const User = require('../models/User');
const Account = require('../models/Account');
const { ApiError } = require('../middlewares/errorHandler');
const { verifyCurrency } = require('../utils/apilayer');
const logger = require('../utils/logger');

exports.createAdmin = async (req, res, next) => {
    try {
        const { email, user_name, password } = req.body;

        const existingAdmin = await Admin.findOne({ where: { email } });
        if (existingAdmin) {
            throw new ApiError(400, 'Admin with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
            email,
            user_name,
            password: hashedPassword
        });

        res.status(201).json(admin);
    } catch (error) {
        next(error);
    }
};

exports.getUsersByCurrency = async (req, res, next) => {
    try {
        const currency = req.params.currency;
        const users = await User.findAll({
            include: [{
                model: Account,
                where: { currency },
                attributes: { exclude: ['password'] }
            }]
        });

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

exports.closeUserAccount = async (req, res, next) => {
    try {
        const email = req.params.email;
        const account = await Account.findOne({ where: { email } });

        if (!account) {
            throw new ApiError(404, 'Account not found');
        }

        account.active = false;
        await account.save();

        res.status(200).json({ message: 'Account closed' });
    } catch (error) {
        next(error);
    }
};

async function createCurrency(req, res) {
  const { currency } = req.body;

  try {
    const isValidCurrency = await verifyCurrency(currency);

    if (!isValidCurrency) {
      logger.warn(`Invalid currency: ${currency}`);
      return res.status(400).json({ error: 'Invalid currency type' });
    }

    logger.info(`Currency ${currency} verified and created.`);
    res.status(201).json({ message: 'Currency created successfully' });
  } catch (error) {
    logger.error(`Error creating currency: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createCurrency
};