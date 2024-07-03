
//Basic Lib Import
const express=require('express');
const app=new express;
const router=require('./src/Routes/api');
const bodyParser=require('body-parser');

//Security Middleware Lib Import
const rateLimit=require('express-rate-limit');
const helmet=require('helmet');
const mongoSanitize=require('express-mongo-sanitize');
const cors=require('cors');
const hpp=require('hpp');
const xss=require('xss-clean');

//Database Lib Import
const mongoose=require('mongoose');


//Security Middleware Implementation
app.use(cors());
app.use(hpp());
app.use(xss());
app.use(mongoSanitize());
app.use(helmet());

//Body Parser Implement

app.use(bodyParser.json());

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb'}));

app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb'}));

//Request RateLimt
const rateLimiter=rateLimit({
    windowMs:1000*60*15,
    max:3000
});

app.use(rateLimiter);

//Mongodb Database Connection
let URl="mongodb+srv://<username>:<password>@cluster0.75qh3yi.mongodb.net/TaskManager?retryWrites=true&w=majority&appName=Cluster0";
let option={
    user:'rakib107054',
    pass:'rakib172561',
    autoIndex:true
}

mongoose.connect(URl,option).then(()=>{
    console.log("Database successfully connected");
}).catch((e)=>{
    console.log(e);
})

//Routing Implement
app.use('/api/v1',router);

// Undefined Route Implement
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"Not Found"});
})

module.exports=app;