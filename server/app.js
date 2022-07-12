const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error");
app.use(fileUpload());

/*
app.use(cors({
    origin : ["http://localhost:3000"], 
    methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
  credentials: true,
  allowedHeaders: ['Authorization','Content-Type'],
  preflightContinue:true
  
}));*/
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true },{limit : '50mb'}));
app.use(cookieParser());


const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');





app.use('/api/v1' , userRoute);
app.use('/api/v1' , postRoute);

app.use(errorMiddleware);




module.exports = app;