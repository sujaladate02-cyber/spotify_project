require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log("server is running on port 5000");
});