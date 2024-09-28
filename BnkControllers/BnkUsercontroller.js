const User = require('../models/User');
const Account = require('../models/Account');
const { ApiError } = require('../middlewares/errorHandler');

exports.createUser = async (req, res, next) => {
    try {
        const { email, user_name, password, dob } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new ApiError(400, 'User with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            user_name,
            password: hashedPassword,
            dob,
            registered_date: new Date()
        });

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: ['id', 'email', 'user_name', 'dob', 'registered_date']
        });

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

exports.getUserAccounts = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const accounts = await Account.findAll({ where: { email: req.user.email } });

        res.status(200).json(accounts);
    } catch (error) {
        next(error);
    }
};