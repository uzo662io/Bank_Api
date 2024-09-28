const Account = require('../models/Account');
const { ApiError } = require('../middlewares/errorHandler');

exports.createAccount = async (req, res, next) => {
    try {
        const { email, currency } = req.body;

        const account = await Account.create({
            email,
            currency,
            amount: 0,
            opening_date: new Date(),
            active: true
        });

        res.status(201).json(account);
    } catch (error) {
        next(error);
    }
};

exports.deposit = async (req, res, next) => {
    try {
        const { destination_account, amount } = req.body;

        const account = await Account.findByPk(destination_account);
        if (!account) {
            throw new ApiError(404, 'Account not found');
        }

        account.amount += amount;
        await account.save();

        res.status(200).json({ message: 'Deposit successful', account });
    } catch (error) {
        next(error);
    }
};

exports.withdraw = async (req, res, next) => {
    try {
        const { source_account, amount } = req.body;

        const account = await Account.findByPk(source_account);
        if (!account) {
            throw new ApiError(404, 'Account not found');
        }

        if (account.amount < amount) {
            throw new ApiError(400, 'Insufficient funds');
        }

        account.amount -= amount;
        await account.save();

        res.status(200).json({ message: 'Withdrawal successful', account });
    } catch (error) {
        next(error);
    }
};

exports.transfer = async (req, res, next) => {
    try {
        const { source_account, destination_account, amount } = req.body;

        const source = await Account.findByPk(source_account);
        const destination = await Account.findByPk(destination_account);

        if (!source || !destination) {
            throw new ApiError(404, 'Account not found');
        }

        if (source.amount < amount) {
            throw new ApiError(400, 'Insufficient funds');
        }

        source.amount -= amount;
        destination.amount += amount;

        await source.save();
        await destination.save();

        res.status(200).json({ message: 'Transfer successful', source, destination });
    } catch (error) {
        next(error);
    }
};