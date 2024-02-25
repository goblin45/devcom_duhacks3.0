const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'UserModel',
        required:[true,"senderId is required"]
    },
    receiverId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'UserModel',
        required:[true,'receiverId is required']
    },    
    customMessage:{
        type:String,
        trim:true,
        default:""
    },
    status:{
        type:String,
        trim:true,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending"
    }
},{timestamps:true});


module.exports = mongoose.model('ConnectionModel',connectionSchema);


