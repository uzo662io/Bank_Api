const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.apilayer.com/exchangerates_data';

async function verifyCurrency(currency) {
  try {
    const response = await axios.get(`${BASE_URL}/symbols`, {
      headers: { 'apikey': API_KEY }
    });
    const symbols = response.data.symbols;
    return !!symbols[currency];
  } catch (error) {
    console.error('Error verifying currency:', error);
    throw new Error('Currency verification failed');
  }
}

async function convertCurrency(fromCurrency, toCurrency, amount) {
  try {
    const response = await axios.get(`${BASE_URL}/convert`, {
      headers: { 'apikey': API_KEY },
      params: {
        from: fromCurrency,
        to: toCurrency,
        amount: amount
      }
    });
    return response.data.result;
  } catch (error) {
    console.error('Error converting currency:', error);
    throw new Error('Currency conversion failed');
  }
}

module.exports = {
  verifyCurrency,
  convertCurrency
};