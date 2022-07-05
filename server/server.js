const app = require('./app')
const dotenv = require('dotenv');
if (process.env.NODE_ENV !=='production') {
    dotenv.config({path : "server/config/config.env"});
 
}

const connectDatabase = require('./config/database');

connectDatabase();


const port = 0;
app.listen(process.env.PORT , ()=>{
    console.log(`listening on port ${process.env.PORT}`);

})