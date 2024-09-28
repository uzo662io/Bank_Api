const PDFDocument = require('pdfkit');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

const generatePDF = (data, templatePath, outputPath) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, data, (err, html) => {
      if (err) {
        return reject(err);
      }

      const doc = new PDFDocument();
      const stream = fs.createWriteStream(outputPath);

      doc.pipe(stream);
      doc.text(html, { align: 'center' });
      doc.end();

      stream.on('finish', () => {
        resolve(outputPath);
      });

      stream.on('error', reject);
    });
  });
};

module.exports = generatePDF;