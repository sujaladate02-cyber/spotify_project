const mongoose = require('mongoose')

  async function connectDB() {
    try{

        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to database")

    }
    catch (error) {
        console.error('Database connection error:', error);
    }
}


module.exports = connectDB;  

