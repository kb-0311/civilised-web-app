const mongoose = require('mongoose');


const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URL).then( (connection)=>{
        console.log(`Databse connected on ${connection.connection.host}`);
    }).catch ((error) => {console.log(error)})
}

module.exports = connectDatabase;