const express = require('express');
const cookieparser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes')
const musicRoutes = require('./routes/music.routes')
const cors = require ("cors");

const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(cors({
  origin: "https://spotify-frontend-bice.vercel.app",
  credentials: true
}));


app.use('/api/auth',authRoutes) 
app.use('/api/music',musicRoutes)

module.exports= app;