const express = require('express');
const cors = require("cors");

const app = express();
const cookieParser = require('cookie-parser');
const placeRouter = require('./routes/place.route');
const userRouter = require('./routes/user.route');
const authRouter = require('./routes/auth.route');
const postRouter = require('./routes/post.route');
// CORS policy
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// lấy db từ file config pool connection 
const db = require('../src/config/postgre')
app.use(express.json()); // parse JSON khi get data từ BODY của POST request

app.use(cookieParser());
app.use((req, res, next) => {
    console.log("Cookies hiện có:", req.cookies);
    next();
});

// Use router
app.use('/api/users', userRouter);

app.use('/api/places', placeRouter);

app.use('/posts', postRouter);

app.use('/auth', authRouter);


const startServer = async () =>{
    const isConnected = await db.testConnection();
    if(!isConnected){
        console.error("Đéo connect được PostgreDB");
        process.exit(1); 
    }
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    })
}

startServer();

module.exports = app;

