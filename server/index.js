const express = require('express');
require('dotenv').config();
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socket(server);
const PORT = process.env.PORT || 5000;

app.use(cors({
    credentials:true,
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// routes
app.get('/',(req,res)=>res.send('Welcome to Devcom server'));


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

// express server PORT
app.listen(PORT, console.log(`Server is running @ PORT ${PORT}`));