const express = require('express');
require('dotenv').config();
const https = require('https');
const fs = require('fs');
const limiter = require('./middlewares/rateLimitMiddleware');
const helmetMiddleware = require('./middlewares/helmetmiddleware');
//const authRoutes = require('./routes/authRoutes');
//const userRoutes = require('./routes/userRoutes');
const accountRoutes = require('./routes/accountRoutes');
const adminRoutes = require('./routes/adminRoutes');
//const { handleError } = require('./middlewares/errorHandler');
const server = express();
server.use(express.json());

const db = require("./config/db");

const logger = require("./utils/logger");


//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(limiter); 
//app.use(corsMiddleware); 
//app.use(helmetMiddleware);



server.use('/api/auth', authRoutes);
server.use('/api/users', userRoutes);
server.use('/api/accounts', accountRoutes);
server.use('/api/admin', adminRoutes);


server.use(handleError);


const httpsOptions = {
    key: fs.readFileSync('path/to/private/key.pem'),
    cert: fs.readFileSync('path/to/certificate.pem')
};

 
const PORT = process.env.PORT || 8000;
https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});