const { body } = require('express-validator');

exports.createAccountValidation = [
    body('UserEmail').isEmail().withMessage('Email is invalid'),
    body('currency').not().isEmpty().withMessage('Currency is required')
];

exports.depositValidation = [
    body('destination_account').isUUID().withMessage('Destination account ID is invalid'),
    body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0')
];

exports.withdrawValidation = [
    body('source_account').isUUID().withMessage('Source account ID is invalid'),
    body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0')
];

exports.transferValidation = [
    body('source_account').isUUID().withMessage('Source account ID is invalid'),
    body('destination_account').isUUID().withMessage('Destination account ID is invalid'),
    body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0')
];