const generatePDF = require('../utils/PDFgenerator');
const path = require('path');

exports.downloadTransactionHistory = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Fetch transactions for the user
    const transactions = await Transaction.findAll({ where: { userId } });

    // Generate PDF
    const templatePath = path.join(__dirname, '../views/transactionHistory.ejs');
    const outputPath = path.join(__dirname, '../downloads/transactionHistory.pdf');

    await generatePDF({ transactions }, templatePath, outputPath);

    res.download(outputPath, 'transactionHistory.pdf', (err) => {
      if (err) {
        next(err);
      }
    });
  } catch (error) {
    next(error);
  }
};