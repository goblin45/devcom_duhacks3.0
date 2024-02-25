const express = require('express');
require('dotenv').config();
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socket(server);
const user = require('./routes/userRoutes');
const post = require('./routes/postRoute');
const auth = require('./routes/authRoute');
const connection = require('./routes/connectionRoute');
const verifyToken = require('./middleware/verifyToken');
const EXPRESS_PORT = process.env.EXPRESS_PORT || 5000;
const IO_PORT = process.env.IO_PORT || 5500;


// middlewares
app.use(cors({
    credentials:true,
    origin:["http://localhost:5173","https://devcom.study","https://devcom-web.vercel.app"]
    // client port = 5173
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// routes
app.get('/',(req,res)=>res.send("Welcome to Devcom node server"));
app.use('/auth',auth);
// app.use(verifyToken); // auth middleware for api protection using authorized user 
app.use('/user',user);
app.use('/post',post);
app.use('/connection',connection);


// socket event handlers
io.on('connection', ({userId}) => {
    console.log('A user connected w id : ',userId);

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });


const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("MongoDB connected successfully");

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

connectToDb();

// socket PORT
io.listen(IO_PORT, console.log(`Socket is running @ PORT ${IO_PORT}`));

// express server PORT
app.listen(EXPRESS_PORT, console.log(`Server is running @ PORT ${EXPRESS_PORT}`));