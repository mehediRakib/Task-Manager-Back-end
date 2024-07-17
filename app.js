// Basic Lib Import
const express = require('express');
const app = new express();
const router = require('./src/Routes/api');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Security Middleware Lib Import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const hpp = require('hpp');
const xss = require('xss-clean');

// Database Lib Import
const mongoose = require('mongoose');

// CORS Configuration

const corsOptions = {
    origin: ['http://localhost:5173', 'https://task-manager-front-donwyx00z-mehedirakibs-projects.vercel.app'],
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Security Middlewares
app.use(hpp());
app.use(xss());
app.use(mongoSanitize());
app.use(helmet());

// Body Parser Implement with increased limit
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));

app.use(cookieParser());
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb' }));

// Request RateLimit
const rateLimiter = rateLimit({
    windowMs: 1000 * 60 * 15,
    max: 3000
});
app.use(rateLimiter);

// MongoDB Database Connection
let URl = "mongodb+srv://<username>:<password>@cluster0.75qh3yi.mongodb.net/TaskManager?retryWrites=true&w=majority&appName=Cluster0";
let option = {
    user: 'rakib107054',
    pass: 'rakib172561',
    autoIndex: true
};

mongoose.connect(URl, option).then(() => {
    console.log("Database successfully connected");
}).catch((e) => {
    console.log(e);
});

// Routing Implement
app.use('/api/v1', router);

// Undefined Route Implement
app.use("*", (req, res) => {
    res.status(404).json({ status: "fail", data: "Not Found" });
});

module.exports = app;
