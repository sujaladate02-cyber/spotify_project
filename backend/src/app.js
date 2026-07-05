const express = require('express');
const cookieparser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes')
const musicRoutes = require('./routes/music.routes')
const cors = require ("cors");

const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));


app.use('/api/auth',authRoutes) 
app.use('/api/music',musicRoutes)
app.use("/api/songs", musicRoutes)


module.exports= app;