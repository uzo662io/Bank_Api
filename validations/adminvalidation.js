const { body } = require('express-validator');

exports.createAdminValidation = [
    body('Email').isEmail().withMessage('Email is invalid'),
    body('Username').not().isEmpty().withMessage('Username is required'),
    body('Password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];