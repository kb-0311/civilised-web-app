const app = require('./app')
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');

if (process.env.NODE_ENV !=='production') {
    dotenv.config({path : "server/config/config.env"});
 
}

const connectDatabase = require('./config/database');

connectDatabase();


cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key :process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})


const port = 0;
const server = app.listen(process.env.PORT , ()=>{
    console.log(`listening on port ${process.env.PORT}`);

})

// Uncaught Exception 
process.on("uncaughtException" , (err)=> {
    console.log(err.message);
    console.log("server shutting down" );
    server.close(()=>{
        process.exit(1);
    });
})

// Unhandled Promise errors
process.on("unhandledRejection" , (err)=> {
    console.log(err.message);
    console.log("server shutting down" );
    server.close(()=>{
        process.exit(1);
    });
})