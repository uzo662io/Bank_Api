const { body } = require('express-validator');

exports.createUserValidation = [
    body('email').isEmail().withMessage('Email is invalid'),
    body('user_name').not().isEmpty().withMessage('Username is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('dob').isDate().withMessage('Date of birth is required')
];